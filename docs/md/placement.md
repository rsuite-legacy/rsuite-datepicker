### 位置

<!--start-code-->
```js

const CustomDatePicker=({placement})=>(
  <DatePicker format="YYYY-MM-DD" placement={placement} placeholder={placement} />
);

const instance = (
  <table>
    <tbody>
      <tr>
        <td></td>
        <td>
          <CustomDatePicker placement="topLeft" />
        </td>
        <td>
          <CustomDatePicker placement="topRight" />
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <CustomDatePicker placement="leftTop" />
        </td>
        <td></td>
        <td></td>
        <td>
          <CustomDatePicker placement="rightTop" />
        </td>
      </tr>
      <tr>
        <td>
          <CustomDatePicker placement="leftBottom" />
        </td>
        <td></td>
        <td></td>
        <td>
          <CustomDatePicker placement="rightBottom" />
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <CustomDatePicker placement="bottomLeft" />
        </td>
        <td>
          <CustomDatePicker placement="bottomRight" />
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>

);
ReactDOM.render(instance);
```
<!--end-code-->
