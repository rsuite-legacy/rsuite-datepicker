import React from 'react';
import DatePicker from '../../src';

const DatePickerWithDefaultValue = React.createClass({
    getInitialState() {
        return {
            value: new Date()
        };
    },
    render() {
        return (
            <div>

                <h5>通过 <code>defaultValue</code> 设置默认显示值</h5>
                <div className="field default-value">
                    <DatePicker defaultValue={new Date()} />
                </div>

                <h5>受控组件，当设置为 <code>value</code> 以后只能通过 <code>onChange</code> 更新值</h5>
                <div className="field default-value">
                    <DatePicker
                        value={this.state.value}
                        onChange={(value) => {
                            this.setState({ value });
                        }}
                    />
                </div>
            </div>

        );
    }
});

export default DatePickerWithDefaultValue;

