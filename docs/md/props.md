| Name         | Type   | Default      | Description |
|--------------|--------|--------------|-------------|
| disabled     | bool   |              | 禁用          |
| defaultValue | date   |              | 默认值         |
| value        | date   |              | 值  `受控组件`   |
| maxDate      | date   |              | 最大可选时间      |
| minDate      | date   |              | 最小可选时间      |
| autoClose    | bool   | true         | 点击关闭        |
| placeholder  | string |              |             |
| dateFormat   | string | `YYYY-MM-DD` | 日期显示格式化     |
| onChange     | func   |              | 值改变后的回调函数   |
| dateFilter   | func   |              | 过滤时间的回调函数   |
| locale       | object |              | 国际化对应的语言描述  |
| ruler        | bool   | true         | 显示刻度尺       |
| hourRange    | array  | [0, 23]      | 设置小时可以调节的范围 |
| minuteRange  | array  | [0, 59]      | 设置分钟可以调节的范围 |
| secondRange  | array  | [0, 59]      | 设置秒可以调节的范围  |
| hourStep     | number | 1            | 设置小时每一步的值   |
| minuteStep   | number | 1            | 设置分钟每一步的值   |
| secondStep   | number | 1            | 设置秒每一步的值    |
