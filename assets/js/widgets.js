
const ExabberrySyntaxErrors = [
    "Current verb does not recognise property",
    "Got unsupported input char",
    "Unknown verb",
    "Verb missing for",
];

const ExaberryCommandRunErrors = [
    "timeout",
    "command mismatch",
];

class ExaberryErrorFilter {
    static _filter_by_error_prefix(error, prefix_lists) {
        for (const prefixes of prefix_lists) {
            for (const prefix of prefixes) {
                if(error.indexOf(prefix) >= 0) {
                    return "";
                }
            }
        }
        return error;
    }

    static filter_by_error_prefix(error, ...prefix_lists) {
        if (Array.isArray(error) === true) {
            let filtered = [];
            error.forEach((err)=>{
                err = ExaberryErrorFilter._filter_by_error_prefix(err, prefix_lists);
                if (err.length > 0) {
                    filtered.push(err);
                }
            });
            return filtered;
        } else {
            return ExaberryErrorFilter._filter_by_error_prefix(error, prefix_lists);
        }
    }
}

class ExaberryWidget {
    constructor(context) {
        this.context = context;
    }

    async _write_property(logger, settings, default_retry, default_timeout, value) {
        let got_error = false;
        let retry = default_retry;
        if (settings.retry) {
            retry = settings.retry;
        }
        let timeout = default_timeout;
        if (settings.timeout) {
            timeout = settings.timeout;
        }
        let widget = this;
        for (let i=0; i<retry; i++) {
            got_error = false;
            await this.context.command_runner.write_property(
                settings.property, value, timeout).
                    catch((err)=> {
                            got_error = true;
                            err = ExaberryErrorFilter.filter_by_error_prefix(
                                err, ExabberrySyntaxErrors, ExaberryCommandRunErrors);
                            if (err.length > 0 && widget.context.serial_handler.isConnected()) {
                                logger.error(
                                    "write \'"+settings.property+"\' failed: "+err);
                            }
                        });
            if (got_error === false) {
                break;
            }
            if (i === retry-1 && this.context.serial_handler.isConnected()) {
                logger.error(
                    "write \'"+settings.property+"\' failed after retry");
            }
        }
        return got_error;
    }

    async _read_property_value(logger, settings, default_retry, default_timeout) {
        let value = null;
        let retry = default_retry;
        if (settings.retry) {
            retry = settings.retry;
        }
        let timeout = default_timeout;
        if (settings.timeout) {
            timeout = settings.timeout;
        }
        let widget = this;
        for (let i=0; i<retry; i++) {
            value = await this.context.command_runner.read_property_value(
                settings.property, timeout).
                    catch((err)=>{
                            err = ExaberryErrorFilter.filter_by_error_prefix(
                                err, ExabberrySyntaxErrors, ExaberryCommandRunErrors);
                            if (widget.context.serial_handler.isConnected()) {
                                logger.error(err);
                            }
                        });
            if (value) {
                break;
            }
            if (i === retry - 1 && this.context.serial_handler.isConnected()) {
                logger.error(
                    "read \'"+settings.property+"\' failed after retry");
            }
        }
        return value;
    }

    async _read_properties(logger, settings, default_retry, default_timeout) {
        let properties = null;
        let retry = default_retry;
        if (settings.retry) {
            retry = settings.retry;
        }
        let timeout = default_timeout;
        if (settings.timeout) {
            timeout = settings.timeout;
        }
        let widget = this;
        for (let i=0; i<retry; i++) {
            properties = await this.context.command_runner.read_properties(
                settings.property, timeout).
                    catch((err)=>{
                        err = ExaberryErrorFilter.filter_by_error_prefix(
                            err, ExabberrySyntaxErrors, ExaberryCommandRunErrors);
                        if (widget.context.serial_handler.isConnected()) {
                            logger.error(err);
                        }
                    });
            if (properties) {
                break;
            }
            if (i === retry-1 && this.context.serial_handler.isConnected()) {
                logger.error(
                    "read \'"+settings.property+"\' failed after retry");
            }
        }
        return properties;
    }

    async _write_and_forget(logger, settings, default_retry, value) {
        let got_error = false;
        let retry = default_retry;
        if (settings.retry) {
            retry = settings.retry;
        }
        let widget = this;
        for (let i=0; i<retry; i++) {
            got_error = false;
            await this.context.command_runner.write_property_and_forget(
                settings.property, value).
                catch((err)=> {
                    if (err === "timeout") {
                        return;
                    }
                    got_error = true;
                    err = ExaberryErrorFilter.filter_by_error_prefix(
                        err, ExabberrySyntaxErrors, ExaberryCommandRunErrors);
                    if (err.length > 0 && widget.context.serial_handler.isConnected()) {
                        logger.error("write \'"+settings.property+"\' failed: "+err)
                    }
                });
            if (got_error === false) {
                break;
            }
            if (i === retry-1 && this.context.serial_handler.isConnected()) {
                logger.error(
                    "write \'"+settings.property+"\' failed after retry");
            }
        }
        return got_error;
    }

    async _refresh_widgets_by_ids(ids) {
        for (const id of ids) {
            let element = document.getElementById(id);
            if (element == null) {
                console.error("cannot find widget for refresh:",id);
                continue;
            }

            let widget = this.context.id_to_widget_map[element.id];
            if (widget && widget.refresh) {
                await widget.refresh();
            } else {
                console.error("cannot find refresh handler for:",id);
            }
        }
    }

}

class ExaberryPropertyTable extends ExaberryWidget {
    constructor(context) {
        super(context);
        this.enable_list = [];

        this.row_renderers = {};
        this.row_value_renderers = {};
        this.row_refresher_factories = {};

        this._add_default_row_renderers();
        this._add_default_row_value_renderers();
        this._add_default_row_refresher_factories();
    }

    add_row_renderer(type, renderer) {
        this.row_renderers[type] = renderer;
    }

    add_row_value_renderer(type, renderer) {
        this.row_value_renderers[type] = renderer;
    }

    _add_default_row_renderers() {
        this.add_row_renderer("link", this._render_link_node.bind(this));
        this.add_row_renderer("mutable", this._render_mutable_node.bind(this));
        this.add_row_renderer("refreshable", this._render_refreshable_node.bind(this));
        this.add_row_renderer("constant", this._render_constant_node.bind(this));
        this.add_row_renderer("switch", this._render_switch_node.bind(this));
        this.add_row_renderer("dropdown", this._render_dropdown_node.bind(this));
        this.add_row_renderer("button", this._render_button_node.bind(this));
    }

    _add_default_row_value_renderers() {
        this.add_row_value_renderer("link", this._render_link_value.bind(this));
        this.add_row_value_renderer("mutable", this._render_mutable_value.bind(this));
        this.add_row_value_renderer("refreshable", this._render_refreshable_value.bind(this));
        this.add_row_value_renderer("constant", this._render_constant_value.bind(this));
        this.add_row_value_renderer("switch", this._render_switch_value.bind(this));
        this.add_row_value_renderer("dropdown", this._render_dropdown_value.bind(this));
        this.add_row_value_renderer("button", this._render_button_value.bind(this));
    }

    _default_row_refresher_factory(message_box, row) {
        let property_table = this;
        let refresh = async function() {
            let value = await property_table._read_property_value(
                message_box,
                row.exaberry_settings,
                property_table._get_retry(),
                property_table._get_timeout());
            if (value) {
                property_table._render_row_value(row, value);
            }
        }
        return refresh;
    }

    _noop_row_refresher_factory(message_box, row) {
        return function (){};
    }

    add_row_refresher_factory(type, factory) {
        this.row_refresher_factories[type] = factory;
    }

    _add_default_row_refresher_factories() {
        this.add_row_refresher_factory("link",        this._default_row_refresher_factory.bind(this));
        this.add_row_refresher_factory("mutable",     this._default_row_refresher_factory.bind(this));
        this.add_row_refresher_factory("refreshable", this._default_row_refresher_factory.bind(this));
        this.add_row_refresher_factory("constant",    this._default_row_refresher_factory.bind(this));
        this.add_row_refresher_factory("switch",      this._default_row_refresher_factory.bind(this));
        this.add_row_refresher_factory("dropdown",    this._default_row_refresher_factory.bind(this));
        this.add_row_refresher_factory("button",      this._noop_row_refresher_factory.bind(this));
    }

    on_load(widget, settings, message_box, broker) {
        this.widget = widget;
        this.settings = settings;
        this.message_box = message_box;
        this.broker = broker;

        let property_table = this;
        for (let i = 0, row; row = widget.children[0].tBodies[0].rows[i]; i++) {
            let row_settings = JSON.parse(row.dataset.exaberry);
            row.exaberry_settings = row_settings;

            let factory = this.row_refresher_factories[row_settings.type];
            if (factory) {
                row.refresh = factory(message_box, row);
            } else {
                console.error("unknown property type: "+row_settings.type);
            }

            if (row.id) {
                this.context.id_to_widget_map[row.id] = row;
            }

            let renderer = this.row_renderers[row_settings.type];
            if (renderer) {
                renderer(row);
            } else {
                console.error("unknown property type: "+row_settings.type);
            }

        }

        this._enable(false);
    }

    async on_connect() {
        this._enable(true);
        await this.refresh();
    }

    on_disconnect() {
        this._enable(false);
    }

    _enable(b) {
        this.enable_list.forEach((v) => v.disabled=!b);
    }

    _create_row_columns(row) {
        let title_column = document.createElement("td");
        title_column.innerText=row.exaberry_settings.title;
        row.appendChild(title_column);
        let data_column = document.createElement("td");
        row.appendChild(data_column);
    }

    _get_data_column(row) {
        return row.cells[1];
    }

    // render node
    _render_link_node(row) {
        let settings = row.exaberry_settings;
        this._create_row_columns(row);
        let parent_node = this._get_data_column(row);

        let a = document.createElement("a");
        a.href = "#";
        parent_node.appendChild(a);
    }

    _render_mutable_node(row) {
        let settings = row.exaberry_settings;
        this._create_row_columns(row);
        let parent_node = this._get_data_column(row);

        let input_group = document.createElement("div");
        input_group.classList.add("input-group");

        let input = document.createElement("input");
        input.classList.add("format-control");
        this.enable_list.push(input);

        let button = document.createElement("button");
        button.classList.add("btn", "btn-success", "ti-reload");
        button.type="submit";
        this.enable_list.push(button);
        let property_table = this;
        button.onclick = async function () {
            await property_table._write_property(
                property_table.message_box,
                settings,
                property_table._get_retry(),
                property_table._get_timeout(),
                input.value);
            if (settings.refresh) {
                await property_table._refresh_widgets_by_ids(settings.refresh);
            }
        }

        input_group.append(input, button);
        parent_node.appendChild(input_group);
    }

    _render_refreshable_node(row) {
        let settings = row.exaberry_settings;
        this._create_row_columns(row);
        let parent_node = this._get_data_column(row);

        let property_table = this;

        let button = document.createElement("button");
        button.classList.add("btn", "btn-success", "ti-reload");
        this.enable_list.push(button);

        let span = document.createElement("span");
        span.style.padding = "0px 10px 0px 0px";
        span.innerText = "-";

        button.onclick = async function () {
            let value = await property_table._read_property_value(
                property_table.message_box,
                settings,
                property_table._get_retry(),
                property_table._get_timeout());
            if (value) {
                span.innerText = value;
            }
        };

        parent_node.appendChild(span);
        parent_node.appendChild(button);
    }

    _render_constant_node(row) {
        this._create_row_columns(row);
    }

    _render_switch_node(row) {
        let settings = row.exaberry_settings;
        this._create_row_columns(row);
        let parent_node = this._get_data_column(row);

        let div = document.createElement("div");
        div.classList.add("form-check", "form-switch");
        let input = document.createElement("input");
        input.classList.add("form-check-input");
        input.type = "checkbox";
        let property_table = this;
        input.onclick = async function () {
            let failed = await property_table._write_property(
                property_table.message_box,
                settings,
                property_table._get_retry(),
                property_table._get_timeout(),
                input.checked.toString());
            if (failed === true) {
                input.checked = !input.checked;
            } else {
                if (settings.refresh) {
                    await property_table._refresh_widgets_by_ids(settings.refresh);
                }
            }
        }
        this.enable_list.push(input);
        div.appendChild(input);
        parent_node.appendChild(div);
    }

    _render_dropdown_node(row) {
        let settings = row.exaberry_settings;
        this._create_row_columns(row);
        let parent_node = this._get_data_column(row);

        let select = document.createElement("select");
        select.classList.add("form-select");
        this.enable_list.push(select);
        let property_table = this;
        select.onchange = async function () {
            let failed = await property_table._write_property(
                property_table.message_box,
                settings,
                property_table._get_retry(),
                property_table._get_timeout(),
                select.value.toString());

            if (failed === false) {
                if (settings.refresh) {
                    await property_table._refresh_widgets_by_ids(settings.refresh);
                }
            }
        };

        for (const val of settings.values) {
            let option = document.createElement("option");
            option.value = val;
            option.innerText = val;
            select.appendChild(option);
        }

        parent_node.appendChild(select);
    }

    _render_button_node(row) {
        let settings = row.exaberry_settings;
        this._create_row_columns(row);
        let parent_node = this._get_data_column(row);

        let button = document.createElement("button");
        button.type="button";
        button.classList.add("btn", "btn-success", "ti-reload");
        this.enable_list.push(button);

        let property_table = this;
        button.onclick = async function () {
            let failed = await property_table._write_property(
                property_table.message_box,
                settings,
                property_table._get_retry(),
                property_table._get_timeout(),
                "true");
            if (failed === false) {
                if (settings.refresh) {
                    await property_table._refresh_widgets_by_ids(settings.refresh);
                }
            }
        }

        parent_node.appendChild(button);
    }

    // render value
    _render_link_value(row, value) {
        let node = this._get_data_column(row);
        if (value) {
            node.children[0].href = value;
            node.children[0].innerText= "link";
        } else {
            node.children[0].href = "#";
            node.children[0].innerText= "";
        }
    }

    _render_mutable_value(row, value) {
        let node = this._get_data_column(row);
        if (value) {
            node.children[0].children[0].value = value;
        } else {
            node.children[0].children[0].value = "missing";
        }
    }

    _render_refreshable_value(row, value) {
        let node = this._get_data_column(row);
        if (value) {
            node.children[0].innerText = value;
        } else {
            node.children[0].innerText = "missing";
        }
    }

    _render_constant_value(row, value) {
        let node = this._get_data_column(row);
        if (value) {
            node.innerText = value;
        } else {
            node.innerText = "missing";
        }
    }

    _render_switch_value(row, value) {
        let node = this._get_data_column(row);
        const positives = ["1", "true", "yes", "on"];
        let checked = positives.includes(value);
        node.children[0].children[0].checked = checked;
    }

    _render_dropdown_value(row, value) {
        let node = this._get_data_column(row);
        for (let option of node.children[0].children) {
            if (option.value == value) {
                option.selected = true;
            } else {
                option.selected = false;
            }
        }
    }

    _render_button_value(row, value) {
        // noop
    }

    ////
    _render_row_value(row, value) {
        let renderer = this.row_value_renderers[row.exaberry_settings.type];
        if (renderer) {
            renderer(row, value);
        } else {
            console.error("unknown property type: "+type);
        }
    }

    async _refresh_given_root() {
        let properties = await this._read_properties(
            this.message_box, this.settings, this._get_retry(), this._get_timeout());
        if (properties == null) {
            console.log("reading property failed");
            return;
        }

        let property_dict = {};
        properties.forEach(function (p) {
            property_dict[p.property] = p.value;
        });

        for (let i = 0, row; row = this.widget.children[0].tBodies[0].rows[i]; i++) {
            let settings = row.exaberry_settings;
            let value = property_dict[settings.property];
            if (value == null) {
                console.log("cannot find property:",settings.property);
                continue;
            }
            this._render_row_value(row, value);
        }
    }

    _get_timeout () {
        if (this.settings.timeout) {
            return this.settings.timeout;
        }
        return 1000;
    }

    _get_retry () {
        if (this.settings.retry) {
            return this.settings.retry;
        }
        return 1;
    }

    async _refresh_by_rows() {
        let property_table = this;
        for (let i = 0, row; row = this.widget.children[0].tBodies[0].rows[i]; i++) {
            await row.refresh();
        }
    }

    async refresh() {
        if (this.settings.property) {
            await this._refresh_given_root();
        } else {
            await this._refresh_by_rows();
        }
    }
}

class SerialConnectButton {
    constructor(serial_handler, validator) {
        this.serial_handler = serial_handler;
        this.connect_callbacks = [];
        this.disconnect_callbacks = [];
        this.connection_validator = validator;
        this.settings = null;
    }

    on_load(widget, settings, message_box, broker) {
        this.widget = widget;
        this.settings = settings;
        this.message_box = message_box;

        this.button = widget.querySelector(".exaberry-serial-connect-button");
        if (!SerialHandler.serialIsSupported()) {
            this.button.disabled = true;
            this.message_box.error("Web serial is not supported by this browser");
            return;
        }

        this.button.addEventListener("click", this.on_click.bind(this));
        this.connection_validator.on_load(
            settings.firmwareVersion,
            settings.hardwareVersion,
            settings.typeId,
            this.message_box);
    }

    async post_connect() {
        this.serial_handler.start_listen();

        let valid = await this.connection_validator.validate();
        if (valid === false) {
            await this.disconnect();
            return;
        }

        this.button.innerText = "Disconnect";
        this.button.blur();
        this.connect_callbacks.forEach((cb, i) => cb());
    }

    pre_disconnect() {
        this.disconnect_callbacks.forEach((cb, i) => cb());
        this.button.innerText = "Connect";
    }

    async disconnect() {
        await this.serial_handler.disconnect();
    }

    async on_click() {
        if (this.serial_handler.isConnected()) {
            this.pre_disconnect();
            await this.disconnect();
        } else {
            let succeed = await this.serial_handler.connect(115200);
            if (succeed === true) {
                await this.post_connect();
            } else {
                this.message_box.error("Connection failed");
            }
        }
    }

    register_connect_callbacks(cbs) {
        if (cbs) {
            this.connect_callbacks.push(cbs);
        }
    }

    register_disconnect_callbacks(cbs) {
        if (cbs) {
            this.disconnect_callbacks.push(cbs);
        }
    }
}

class FireAndDisconnectButton extends ExaberryWidget {
    // used for restart or reboot

    constructor(context) {
        super(context);
    }

    on_load(widget, settings, message_box, broker) {
        this.widget = widget;
        this.widget.addEventListener("click", this.on_click.bind(this));
        this.widget.disabled = true;
        this.settings = settings;
        this.message_box = message_box;
    }

    on_connect() {
        this.widget.disabled = false;
    }

    on_disconnect() {
        this.widget.disabled = true;
    }

    async on_click() {
        this.context.connect_button.pre_disconnect();
        await this._write_and_forget(
            this.message_box, this.settings, 1, "true");
        this.context.command_runner.clear_tasks();
        await this.context.connect_button.disconnect();
    }
}

class ConnectionValidator extends ExaberryWidget {
    constructor(context) {
        super(context);
    }

    on_load(
        expected_firmware_versions,
        expected_hardware_versions,
        expected_type,
        message_box) {

        this.type_id = expected_type;
        this.firmware_versions = expected_firmware_versions;
        this.hardware_versions = expected_hardware_versions
        this.message_box = message_box;
    }

    async validate() {
        let validator = this;
        let device_is_valid = true;

        let settings = {
            property: "device.type_id",
        }
        if (this.type_id) {
            let type_id = await this._read_property_value(
                this.message_box, settings, 2, 1000);
            if (type_id) {
                if (type_id !== validator.type_id) {
                    this.message_box.error("type_id mismatch. expected: "+validator.type_id+" actual: "+type_id);
                    return false;
                }
            } else {
                this.message_box.error("cannot get type id");
                return false;
            }
        }

        if (this.firmware_version) {
            settings.property = "device.firmware.version";
            let version = await this._read_property_value(
                this.message_box, settings, 2, 1000);
            if (version) {
                if (validator.firmware_versions.includes(version) !== true) {
                    this.message_box.error("unsupported firmware version. supported: "+validator.firmware_versions+", actual: "+version);
                    return false;
                }
            } else {
                this.message_box.error("cannot get firmware version");
                return false;
            }
        }

        if (this.hardware_versions) {
            settings.property = "device.hardware.version";
            let version = await this._read_property_value(
                this.message_box, settings, 2, 1000);
            if (version) {
                if (validator.hardware_versions.includes(version) !== true) {
                    this.message_box.error("unsupported hardware version. supported: "+validator.hardware_versions+", actual: "+version);
                    return false;
                }
            } else {
                this.message_box.error("cannot get hardware version");
                return false;
            }
        }
        return true;
    }
}

class ExaberryMessageBox {
    on_load(widget, settings) {
        this.widget = widget;
        this.settings = settings;
    }

    _new_message_box(level, msg) {
        let box = document.createElement("div");
        box.classList.add("alert", "alert-dismissible", "fade", "show", "alert-"+level);
        box.setAttribute("role", "alert");
        box.innerText=this.settings.device+": "+msg;

        let button = document.createElement("button");
        button.classList.add("btn-close");
        button.setAttribute("data-bs-dismiss", "alert");
        button.setAttribute("aria-label", "Close");

        box.appendChild(button);
        return box;
    }

    _append_message(level, msg) {
        let box = this._new_message_box(level, msg);
        let maxMessageNumber = 5;
        if (this.settings.maxMessageNumber) {
            maxMessageNumber = this.settings.maxMessageNumber;
        }
        this.widget.appendChild(box);
        if (this.widget.children.length > maxMessageNumber) {
            let removed = this.widget.children[0];
            this.widget.removeChild(removed);
        }
    }

    error(err) {
        let error_msgs = err;
        if (Array.isArray(err) === true) {
            error_msgs = "";
            err.forEach((msg)=>{
                if (msg.length > 0) {
                    error_msgs += msg;
                }
            });
        }
        if (error_msgs.length >0) {
            // console.error(error_msgs);
            this._append_message("danger", error_msgs);
        }
    }

    info(message) {
        if (message.length > 0) {
            // console.log(message);
            this._append_message("secondary", message);
        }
    }
}

class ExaberryTimeSeries extends ExaberryWidget {
    constructor(context) {
        super(context);
    }

    on_load(widget, settings, message_box, broker) {
        this.widget = widget;
        this.settings = settings;
        this.message_box = message_box;
        this.broker = broker;

        if (this.settings.bufferSize == null) {
            this.settings.bufferSize = 1000;
        }

        this.chart = echarts.init(widget);
        let option = this._init_chart_option();
        this.chart.setOption(option);

        this.data = [];
        this.data_poll_interval_id = undefined;
    }

    on_connect() {
        let widget = this;
        let interval = 2000;
        if (this.settings.refreshInterval) {
            interval = this.settings.refreshInterval;
        }
        if (this.settings.subscribe == null) {
            this.data_poll_interval_id = setInterval(
                widget._poll_data.bind(widget),
                interval);
        }
    }

    on_disconnect() {
        if (this.data_poll_interval_id) {
            clearInterval(this.data_poll_interval_id);
        }
    }

    on_key_value(key, value) {
        if (value) {
            if (this.settings.float_precision) {
                value = parseFloat(value).toFixed(this.settings.float_precision);
            }
            this.data.push([Date.now(), value]);
            if (this.data.length > this.settings.bufferSize) {
                this.data.shift();
            }
            this.chart.setOption({
                    series: [
                        {
                            data: this.data
                        }
                    ]
                });
        }
    }

    async _poll_data() {
        let value = await this._read_property_value(
            this.message_box, this.settings, 1, 1000);

        this.broker.publish(this.widget.id, this.settings.property, value);
        this.on_key_value("not_used", value);
    }

    _init_chart_option() {
        let option = {
            title: {
                text: this.settings.title,
            },
            tooltip: {
              trigger: 'axis'
            },
            // legend: {
            //     data:['Temperature']
            // },
            toolbox: {
                feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                // restore: {},
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'time',
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: this.settings.title,
                type: 'line',
                data: [],
            }]
        };
        return option;
    }

    on_resize() {
        this.chart.resize();
    }
}

class ExaberryGauge extends ExaberryWidget {
    constructor(context) {
        super(context);
    }

    on_resize() {
        this.chart.resize();
    }

    on_load(widget, settings, message_box, broker) {
        this.widget = widget;
        this.settings = settings;
        this.message_box = message_box;
        this.broker = broker;

        this.chart = echarts.init(widget);
        let option = this._init_chart_option();
        this.chart.setOption(option);

        this.data_poll_interval_id = undefined;
    }

    on_connect() {
        let widget = this;
        let interval = 2000;
        if (this.settings.refreshInterval) {
            interval = this.settings.refreshInterval;
        }
        if (this.settings.subscribe == null) {
            this.data_poll_interval_id = setInterval(
                widget._poll_data.bind(widget),
                interval);
        }
    }

    on_disconnect() {
        if (this.data_poll_interval_id) {
            clearInterval(this.data_poll_interval_id);
        }
    }

    on_key_value(key, value) {
        if(value) {
            if (this.settings.float_precision) {
                value = parseFloat(value).toFixed(this.settings.float_precision);
            }
            this.chart.setOption({
                    series: [
                        {
                            data: [
                                {
                                    value: value,
                                    name: this.settings.unit,
                                }
                            ]
                        }
                    ]
                });
        }
    }

    async _poll_data() {
        let value = await this._read_property_value(
            this.message_box, this.settings, 1, 1000);

        this.broker.publish(this.widget.id, this.settings.property, value);
        this.on_key_value("not_used", value);
    }

    _init_chart_option() {
        let option = {
            tooltip: {
                formatter: '{a} <br/>: {c} {b}'
            },
            series: [
                {
                    name: this.settings.title,
                    min: this.settings.min,
                    max: this.settings.max,
                    type: 'gauge',
                    progress: {
                        show: true
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}'
                    },
                    data: [
                        {
                            value: 0,
                            name: this.settings.title
                        }
                    ]
                }
            ]
        };
        return option;
    }
}

class ExaberryWidgetMessageBroker {
    constructor() {
        this.subscribers_of_publisher = {};
    }

    publish(publisher_id, key, value) {
        if (publisher_id == null || publisher_id === "") {
            console.error("empty publisher id");
            return;
        }
        let subscribers = this.subscribers_of_publisher[publisher_id];
        if (subscribers) {
            subscribers.forEach((sub)=>{
                if (key === sub.key) {
                    sub.subscriber.on_key_value(key, value);
                }
            });
        }
    }

    add_subscriber(subscriber, publisher_id, key) {
        if(this.subscribers_of_publisher[publisher_id] == null) {
            this.subscribers_of_publisher[publisher_id] = [];
        }
        this.subscribers_of_publisher[publisher_id].push(
            {
                subscriber: subscriber,
                key: key,
            });
    }
}

class ExaberryApplication {
    constructor() {
        this.resize_callbacks = [];
        this.device_context = {};
        this.device_to_message_box_map = {};
        this.id_to_widget_map = {};
        this.widgets = [];
        this.message_broker = new ExaberryWidgetMessageBroker();
    }

    _build_message_boxes() {
        let widgets = document.getElementsByClassName("exaberry-widget-message-box");
        for (let w of widgets) {
            let settings = JSON.parse(w.dataset.exaberry);
            let box = new ExaberryMessageBox();
            box.on_load(w, settings);
            this.device_to_message_box_map[settings.device] = box;
        }
    }

    _build_widget(widget_class_name, builder) {
        let app = this;
        let widgets = document.getElementsByClassName(widget_class_name);
        for (let w of widgets) {
            let settings = JSON.parse(w.dataset.exaberry);
            let device_context = this.device_context[settings.device];
            device_context.settings = settings;
            if (device_context.command_runner) {
                let widget_handler = builder(device_context);
                if (w.id) {
                    this.id_to_widget_map[w.id] = widget_handler;
                }
                if (widget_handler.on_load) {
                    widget_handler.on_load(w, settings, device_context.message_box, this.message_broker);
                }

                if (settings.subscribe) {
                    settings.subscribe.forEach((sub_for) => {
                        app.message_broker.add_subscriber(widget_handler, sub_for.publisher, sub_for.key);
                    });
                }

                if (widget_handler.on_connect) {
                    device_context.connect_button.register_connect_callbacks(widget_handler.on_connect.bind(widget_handler));
                }
                if (widget_handler.on_disconnect) {
                    device_context.connect_button.register_disconnect_callbacks(widget_handler.on_disconnect.bind(widget_handler));
                }

                if (widget_handler.on_resize) {
                    this.resize_callbacks.push(widget_handler.on_resize.bind(widget_handler));
                }
            } else {
                console.error("cannot find command runner for: ", settings.device);
            }
        }
    }

    on_load() {
        let app = this;
        this._build_message_boxes();

        let connect_widgets = document.getElementsByClassName("exaberry-widget-connect");
        for (let w of connect_widgets) {
            let context = {
                serial_handler: null,
                command_runner: null,
                connect_button: null,
                message_box: null,
                id_to_widget_map: null,
            };
            let settings = JSON.parse(w.dataset.exaberry);
            let box = this.device_to_message_box_map[settings.device];
            let serial_handler = new SerialHandler(box);
            let command_runner = new CommandRunner(serial_handler);
            let validator = new ConnectionValidator(context);
            let button = new SerialConnectButton(serial_handler, validator);
            button.on_load(w, settings, box, this.message_broker);

            this.device_context[settings.device] = context;
            context.serial_handler = serial_handler;
            context.command_runner = command_runner;
            context.connect_button = button;
            context.message_box = box;
            context.id_to_widget_map = this.id_to_widget_map;
        }

        this.widgets.forEach((w)=>{
            this._build_widget(w.name, w.builder);
        });
    }

    on_resize() {
        this.resize_callbacks.forEach((cb) => cb());
    }

    add_widget(class_name, builder) {
        this.widgets.push(
            {
                name: class_name,
                builder: builder,
            });
    }

    get_widget_by_id(id) {
        return this.id_to_widget_map[id];
    }
}

let exaberryApp = new ExaberryApplication();
window.onload = exaberryApp.on_load.bind(exaberryApp);
window.onresize = exaberryApp.on_resize.bind(exaberryApp);

exaberryApp.add_widget(
    "exaberry-widget-time-series",
    function (ctx) {
        return new ExaberryTimeSeries(ctx);
    }
);

exaberryApp.add_widget(
    "exaberry-widget-gauge",
    function (ctx) {
        return new ExaberryGauge(ctx);
    }
);

exaberryApp.add_widget(
    "exaberry-widget-property-table",
    function (ctx) {
        return new ExaberryPropertyTable(ctx);
    }
);

exaberryApp.add_widget(
    "exaberry-widget-fire-and-disconnect-button",
    function (ctx) {
        return new FireAndDisconnectButton(ctx);
    }
);

