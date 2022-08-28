
class ExaberryGPIOPropertyTable extends ExaberryPropertyTable {
    constructor(context) {
        super(context);

        this.add_row_renderer("gpio_value", this._render_gpio_value_node.bind(this));
        this.add_row_value_renderer("gpio_value", this._render_gpio_value_value.bind(this));
        this.add_row_refresher_factory("gpio_value", this._gpio_value_refresher_factory.bind(this));
    }

    static _get_selector_from_gpio_mode_row(row) {
        return row.cells[1].children[0];
    }

    // gpio_value
    _get_gpio_mode_from_value_row(value_row) {
        let mode_row = this.context.id_to_widget_map[value_row.exaberry_settings.mode_row_id];
        let mode_value = ExaberryGPIOPropertyTable._get_selector_from_gpio_mode_row(mode_row).value;
        return mode_value;
    }

    _render_gpio_value_node(row) {
        this._render_switch_node(row);
    }

    _render_gpio_value_value(row, value) {
        let mode = this._get_gpio_mode_from_value_row(row);
        if (mode !== row.previous_gpio_mode) {
            row.previous_gpio_mode = mode;
            row.innerHTML = ''; // remove all children
            if (mode == "output") {
                this._render_switch_node(row);
            } else {
                this._render_refreshable_node(row);
            }
        }
        if (mode === "output") {
            this._render_switch_value(row, value);
        } else {
            this._render_refreshable_value(row, value);
        }
    }

    _gpio_value_refresher_factory(message_box, row) {
        return super._default_row_refresher_factory(message_box, row);
    }
}

exaberryApp.add_widget(
    "exaberry-widget-gpio-property-table",
    function (ctx) {
        return new ExaberryGPIOPropertyTable(ctx);
    }
);

