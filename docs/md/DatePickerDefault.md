

### 默认

<!--start-code-->
```js
const DatePickerDefault = props => (
  <div className="field">
    <p>- 显示日历面板</p>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" inline />
    <p>- 设置 <code>Monday</code> 为周的第一天 </p>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" inline firstDayOfWeek="Monday" />
    <p>- 显示日期与时间:</p>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" />
    <p>- 显示日期</p>
    <DatePicker format="YYYY-MM-DD" />
    <p>- 显示月份</p>
    <DatePicker format="YYYY-MM" ranges={[]} />
    <p>- 显示时间</p>
    <DatePicker format="HH:mm:ss" ranges={[]} />
    <p>- 只显示小时与分钟</p>
    <DatePicker format="HH:mm" ranges={[]} />
    <p>- 设置 placeholder</p>
    <DatePicker placeholder="请选择日期" />
    <p>- 设置默认值</p>
    <DatePicker defaultValue={moment()} />
    <p>- 设置日历面板默认时间</p>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" calendarDefaultDate={moment('2012-10-01 12:00:00')} />
  </div>
);

ReactDOM.render(<DatePickerDefault />);

```
<!--end-code-->
