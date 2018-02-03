### 非受控与受控

<!--start-code-->
```js
class DatePickerValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment()
    };
  }
  render() {
    return (
      <div className="field">
        <DatePicker
          defaultValue={moment()}
          onChange={(value) => {
            console.log('1', value && value.format('YYYY-MM-DD'));
          }}
        />
        <DatePicker
          value={this.state.value}
          onChange={(value) => {
            console.log('2', value && value.format('YYYY-MM-DD'));
            this.setState({ value });
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<DatePickerValue />);

```
<!--end-code-->
