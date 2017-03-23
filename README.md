# rsuite-datepicker

[![Build Status](https://travis-ci.org/rsuite/rsuite-datepicker.svg?branch=master)](https://travis-ci.org/rsuite/rsuite-datepicker)


### install

```
npm install rsuite-datepicker --save
```


### Usage

```
import DatePicker from 'rsuite-datepicker';

<DatePicker dateFormat="YYYY-MM-DD" />

```


### Properties

 Name | Type | Default | Description |
 ---- | ---- | ------- | ----------- |
 defaultValue | Date | | 默认值 |
 value | Date |  | 值  `受控组件` |
 maxDate | Date | | 最大可选时间 |
 minDate | Date | | 最小可选时间 |
 autoClose| bool | true | 点击关闭 |
 placeholder | string | |
 dateFormat | string |  `YYYY-MM-DD` | 日期显示格式化
 onChange | func|   | 值改变后的回调函数
 dateFilter | func |  | 过滤时间的回调函数



### License

MIT
