```html
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
  toggle={this.state.toggle}
/>
```
