## API

| Name                | Type                                       | Default    | Description                                             |
| ------------------- | ------------------------------------------ | ---------- | ------------------------------------------------------- |
| value               | [moment](http://momentjs.com/)             |            | 值`受控`                                                |
| defaultValue        | [moment](http://momentjs.com/)             |            | 默认值                                                  |
| calendarDefaultDate | [moment](http://momentjs.com/)             |            | 日历面板默认呈现的日期时间                              |
| onChange            | function(`date`:moment)                    |            | 值改变后的回调函数                                      |
| onToggle            | function(`show`:boolean)                   |            | 打开或者关闭日历版本的回调函数                          |
| onSelect            | function(`date`:moment)                    |            | 选择日期或者时间的回调函数                              |
| placeholder         | string                                     |            | 没有值时候默认显示内容                                  |
| format              | string                                     | YYYY-MM-DD | 日期显示格式化                                          |
| locale              | object                                     |            | 本地化对应的语言描述                                    |
| ranges              | array                                      | [...]      | 快捷项配置                                              |
| inline              | boolean                                    |            | 默认显示日历面板                                        |
| disabled            | boolean                                    |            | 禁用组件                                                |
| disabledDate        | function(`date`:moment)                    |            | 禁用日期                                                |
| disabledHours       | function(`hour`:number, `date`:moment)     |            | 禁用小时                                                |
| disabledMinutes     | function(`minute`:number, `date`:moment)   |            | 禁用分钟                                                |
| disabledSeconds     | function(`second`:number, `date`:moment)   |            | 禁用秒                                                  |
| hideHours           | function(`hour`:number, `date`:moment)     |            | 隐藏小时                                                |
| hideMinutes         | function(`minute`:number, `date`:moment)   |            | 隐藏分钟                                                |
| hideSeconds         | function(`second`:number, `date`:moment)   |            | 隐藏秒                                                  |
| align               | string                                     | `left`     | 对齐方式，选项： `left`, `right`                         |
| cleanable           | boolean                                    | `true`     | 可以清除                                                |
| isoWeek             | boolean                                    |            | ISO 8601 标准， 每个日历星期从星期一开始，星期日为第7天 |
| yearCeiling         | number                                     | 5          | 相对当前选择的时间，能够选择的最大年份上限              |
