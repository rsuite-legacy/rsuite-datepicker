```html
 <DatePicker
  ranges={[{
    label: '昨天',
    value: moment().add(-1, 'd')
  }, {
    label: '今天',
    value: moment()
  }, {
    label: '前一天',
    unclosed: true,
    value: (datePage) => {
      return moment(datePage).add(-1, 'd');
    }
  }]}
/>
```
