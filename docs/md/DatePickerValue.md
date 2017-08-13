```html
<DatePicker defaultValue={moment()} />
<DatePicker
  value={this.state.value}
  onChange={(value) => {
    this.setState({ value });
  }}
/>
```
