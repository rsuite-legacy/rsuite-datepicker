### 控制展开与关闭

<!--start-code-->
```js


class DatePickerToggle extends React.Component {
  render() {
    return (
      <div className="field">
        <ButtonToolbar style={{ marginBottom: 10 }}>
          <Button
            shape="default"
            onClick={() => {
              this.picker.show(true);
            }}
          >
            展开
          </Button>
          <Button
            shape="default"
            onClick={() => {
              this.picker.hide(true);
            }}
          >
            关闭
          </Button>
        </ButtonToolbar>

        <DatePicker
          ref={ref => this.picker = ref}
        />

      </div>
    );
  }
}

ReactDOM.render(<DatePickerToggle />);

```
<!--end-code-->

