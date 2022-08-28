class SerialHandler {
    constructor(logger) {
        if (logger) {
            this.logger = logger;
        } else {
            this.logger = console;
        }
    }

    async connect(baudRate) {
        if (this.port) {
            this.disconnect();
        }

        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
        if (SerialHandler.serialIsSupported()) {
            try {
                const port = await navigator.serial.requestPort();
                await port.open({ baudRate: baudRate }); // `baudRate` was `baudrate` in previous versions.

                this.writer = port.writable.getWriter();

                // const signals = await port.getSignals();
                // console.log(signals);
                this.port = port;
                this.serialConnected = true;
                return true
            } catch(err) {
                this.logger.error('Error opening the serial port. Connection is cancelled or serial port is in use.', err);
                return false
            }
        } else {
            this.logger.error('Web serial doesn\'t seem to be enabled in your browser. Check https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility for more info.')
            return false
        }
        return false
    }

    async disconnect() {
        this.serialConnected = false;
        if (this.port) {
            try {
                if (this.reader) {
                    this.reader.cancel();
                    this.reader.releaseLock();
                }
                this.writer.releaseLock();
                await this.port.close();
                this.port = undefined;
            } catch(err) {
                this.logger.log('disconnection error:', err);
            }
        }
    }

    async write(data) {
        if (this.port && this.serialConnected === true) {
            const dataArrayBuffer = this.encoder.encode(data);
            return await this.writer.write(dataArrayBuffer);
        }
    }

    async start_listen() {
        let decoder = this.decoder;
        let listener = this.listener;
        while (this.port.readable && this.serialConnected === true) {
            this.reader = this.port.readable.getReader();
            try {
                while (true) {
                    const { done, value } = await this.reader.read();
                    if (done) {
                        // |reader| has been canceled.
                        break;
                    }
                    if (listener) {
                        listener(decoder.decode(value));
                    }
                }
            } catch (error) {
                this.logger.error(error);
            }
        }
    }

    static serialIsSupported() {
        return 'serial' in navigator
    }

    isConnected() {
        return this.port;
    }

    register_listener(listener) {
        this.listener = listener;
    }
}

class CommandRunner {
    constructor(serial_handler) {
        this.buffer = "";
        this.serial_handler = serial_handler;
        serial_handler.register_listener(this._listen_to.bind(this));
        this.found_error_msg = false;

        this.current_task_listener = null;
        this.tasks = [];
        this.errors = [];
    }

    _finish_task() {
        this.errors = [];
        this.current_task_listener = null;
        // finish and pop the current task.
        this.tasks.shift();
        // try fetch and run the next command
        this._run_task();
    }

    _process_error() {
        let task = this.current_task_listener;
        let errors = [...this.errors];
        this._finish_task();
        if (task) {
            clearTimeout(task.timeout_id);
            task.error_handler(errors);
            task.cb([]);
        } else {
            console.error(errors);
        }
    }

    _process_response(message) {
        let task = this.current_task_listener;
        if (task) {
            clearTimeout(task.timeout_id);
            let lines = CommandRunner._split_nonempty_lines(message);
            if (lines.length === 0 || lines[0].trim() !== task.command) {
                task.error_handler("command mismatch");
                // console.error(lines[0].trim(),task.command);
                task.cb([]);
            } else {
                task.cb(lines.slice(1));
            }
        } else {
            console.log("drop: "+message);
        }
        this._finish_task();
    }

    _extract_error_and_response_until_no_break() {
        let response = null;
        let break_index = this.buffer.indexOf(">");
        while (break_index !== -1) {
            let message = this.buffer.substr(0, break_index);
            let error_index = message.indexOf("* ");
            if (error_index !== -1) {
                this.errors.push(message.substr(error_index+2));
            } else {
                if (response) {
                    console.log("drop: "+response);
                }
                response = message;
            }

            this.buffer = this.buffer.substr(break_index+1);
            break_index = this.buffer.indexOf(">");
        }
        return response;
    }

    _listen_to(str) {
        let break_index = str.indexOf(">");
        if (break_index !== -1) {
            let response = null;
            let prev_buffer_size = this.buffer.length;
            this.buffer += str;
            let error_index = this.buffer.indexOf("* ");
            if (error_index !== -1 && error_index < prev_buffer_size+break_index) {
                let error_message = this.buffer.substr(error_index+2, prev_buffer_size-error_index-2+break_index);
                this.errors.push(error_message);
                this.buffer = str.substr(break_index+1);

                response = this._extract_error_and_response_until_no_break();
                if (response) {
                    console.log("drop: "+response);
                }
                if (this.buffer.trim().length > 0) {
                    return;
                }

                this._process_error();
            } else {
                response = this.buffer.substr(0, prev_buffer_size+break_index);
                this.buffer = str.substr(break_index+1);

                let another_response = this._extract_error_and_response_until_no_break();
                if (another_response) {
                    console.log("drop: "+another_response);
                }
                if (this.buffer.trim().length > 0) {
                    return;
                }

                if (this.errors.length > 0) {
                    this._process_error(this.errors);
                } else if (response) {
                    this._process_response(response);
                }
            }
        } else {
            this.buffer += str;
        }
    }

    static _split_nonempty_lines(str) {
        if (str) {
            let lines = str.split(/\r?\n/);
            return lines.filter(line => line.length > 0);
        }
        return [];
    }

    static _split_properties(lines) {
        let properties = [];
        lines.forEach(function (line, index) {
                let eq_index = line.indexOf("=");
                if (eq_index !== -1) {
                    let value = line.substr(eq_index+1);
                    if (value.length > 0) {
                        if (value.charCodeAt(value.length-1) === 0) {
                            value = value.substr(0, value.length-1);
                        }
                        properties.push({
                            property: line.substr(0, eq_index),
                            value: value,
                        });
                    }
                }
            });
        return properties
    }

    async _run_task() {
        let task = this.tasks[0];
        if (task) {
            switch(task.op) {
                case 'read':
                {
                    let command = "read " + task.property + "\n";
                    this.current_task_listener = {
                        command: command.trim(),
                        cb: function (lines) {
                            task.callback(CommandRunner._split_properties(lines));
                        },
                        error_handler: task.error_handler,
                        timeout_id: task.timeout_id,
                    };
                    await this.serial_handler.write(command);
                }
                break;
                case 'write':
                {
                    let command = "write " + task.property + "=" + task.property_value + "\n";
                    this.current_task_listener = {
                        command: command.trim(),
                        cb: function (lines) {
                            if (lines.length > 0) {
                                task.error_handler(lines);
                            }
                            task.callback();
                        },
                        error_handler: task.error_handler,
                        timeout_id: task.timeout_id,
                    };
                    await this.serial_handler.write(command);
                }
                break;
                case 'write_and_forget':
                {
                    let command = "write " + task.property + "=" + task.property_value + "\n";
                    await this.serial_handler.write(command);
                }
                break;
                default:
                    console.error("unknown verb: "+task.op);
            }
        }
    }

    async _new_task(op, property, value, timeout_ms) {
        let runner = this;
        return new Promise(async function (resolve, reject) {
            let timeout_handler = function () {
                runner.current_task_listener = null;
                reject("timeout");
                resolve(null);
                runner._run_task();
            }

            const timeout_id = setTimeout(timeout_handler, timeout_ms);
            runner.tasks.push(
                {
                    op: op,
                    property: property,
                    property_value: value,
                    timeout_id: timeout_id,
                    callback: resolve,
                    error_handler: reject,
                }
            );
            // run task, if there's only one task in the tasks queue, otherwise
            // wait for other tasks to finish first.
            if (runner.tasks.length === 1) {
                await runner._run_task();
            }
        });
    }

    clear_tasks() {
        this.tasks = [];
        this.buffer = "";
    }

    async read_property_value(p, read_timeout_ms) {
        let property = await this.read_properties(
            p, read_timeout_ms);
        if (property && property.length > 0) {
            return property[0].value;
        }
        return undefined;
    }

    async read_properties(p, read_timeout_ms) {
        return await this._new_task('read', p, undefined, read_timeout_ms);
    }

    async write_property_and_forget(p, v) {
        await this._new_task('write_and_forget', p, v, 100);
    }

    async write_property(p, v, timeout_ms) {
        await this._new_task('write', p, v, timeout_ms);
    }
}
