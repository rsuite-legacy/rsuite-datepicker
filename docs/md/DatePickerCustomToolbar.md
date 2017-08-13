```html
<DatePicker
  ranges={[{
    label: '昨天',
    value: moment().add(-1, 'd')
  }, {
    label: '今天',
    value: moment()
  }, {
    label: '明天',
    value: moment().add(1, 'd')
  }]}
/>
```
