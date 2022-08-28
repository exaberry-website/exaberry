class TerminalWidget {
    constructor(serial_handler) {
        this.serial_handler = serial_handler;
    }

    on_load(widget, settings, logger, broker) {
        this.settings = settings;
        this.widget = widget;
        var size = this.calculate_size();
        this.term = new Terminal({
            cols: size[0],
            rows: size[1],
            useStyle: true,
            screenKeys: true,
            cursorBlink: false
        });
        this.term.open(widget);

        let t = this.term;
        this.serial_handler.register_listener(function (data){
            t.write(data);
        });

        let w = this.serial_handler;
        this.term.on('data', function(data) {
            w.write(data);
        });
    }

    on_resize() {
        if (this.widget) {
            var size = this.calculate_size();
            this.term.resize(size[0], size[1]);
        }
    }

    calculate_size() {
        let height =
            window.innerHeight - this.widget.getBoundingClientRect().y - this.settings.bottom_padding;
        let width = this.widget.clientWidth;

        var cols = Math.max(
            80,
            Math.min(150, width / 7)) | 0;

        var rows = Math.max(
            24,
            Math.min(80, height / 12)) | 0;

        return [cols, rows];
    }

    on_connect() {
        this.term.write('\x1b[31mDevice connected.\x1b[m\r\n');
        this.term.focus();
    }

    on_disconnect() {
        this.term.on('data', function(data){});
        this.term.write('\x1b[31mDevice disconnected.\x1b[m\r\n');
    }
}

exaberryApp.add_widget(
    "exaberry-widget-terminal",
    function (ctx) {
        return new TerminalWidget(ctx.serial_handler);
    }
);

