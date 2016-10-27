import React from 'react';
import ReactDOM from 'react-dom';
import DatePickerOnlyDate from '../example/DatePickerOnlyDate.js';
import DatePickerWithTime from '../example/DatePickerWithTime.js';
import DatePickerOnlyTime from '../example/DatePickerOnlyTime.js';
import DatePickerInRange from '../example/DatePickerInRange.js';
import DatePickerSelectEvent from '../example/DatePickerSelectEvent.js';
import DatePickerWithDefaultValue from '../example/DatePickerWithDefaultValue.js';
import './app.less';

const Section = ({ title, code, desc, children }) => (
    <div className="example-section">
        <h2 className="example-title"> { title }</h2>
        <h3> Code </h3>
        <pre className="code">
            {code}
        </pre>
        <h3> Example </h3>
        { children }
        <p>{ desc }</p>
    </div>
);

const App = (props) => (
    <div id="app">
        <h1 className="title">Rsuite DatePicker</h1>
        <p> >>>>&nbsp;
            <a href="https://github.com/rsuite/rsuite-datepicker">Github Repo</a>
            &nbsp;In Here.
        </p>
        <Section
            title='A simple example'
            code={'<DatePicker dateFormat="YYYY-MM-DD" />'}
            desc='Click to select date'
        >
            <DatePickerOnlyDate />
        </Section>
        <Section
            title='You can also select both date and time instead of just date'
            code={'<DatePicker dateFormat="YYYY-MM-DD HH:mm:ss" />'}
            desc='Change the dateFormat prop to suit your needs'
        >
            <DatePickerWithTime />
        </Section>
        <Section
            title='Or ... just time'
            code={'<DatePicker dateFormat="HH:mm:ss" />'}
            desc='This time without date'
        >
            <DatePickerOnlyTime />
        </Section>
        <Section
            title='Setting a selectable range'
            code={
`
<DatePicker
    dateFormat="YYYY-MM-DD"
    minDate={new Date(2016, 8 - 1, 1)}
    maxDate={new Date(2017, 1 - 1, 30)}
/>
`
            }
            desc='Dates before minDate or after maxDate are unselectable'
        >
            <DatePickerInRange />
        </Section>
        <Section
            title='Do something when date is selected'
            code={
`
<DatePicker
    dateFormat="YYYY-MM-DD"
    onSelect={ date => alert(date.toDateString()) }
/>
`
            }
            desc='onSelect callback function executed each time a date is selected'
        >
            <DatePickerSelectEvent />
        </Section>
        <Section
            title='Give it a default value'
            code={
`
<DatePicker
    dateFormat="YYYY-MM-DD"
    selected={new Date()}
/>
`
            }
            desc='Passing a date as selected prop to set a default value'
        >
            <DatePickerWithDefaultValue />
        </Section>
        <div className="footer">
            <p> More <a href="https://github.com/rsuite/rsuite-datepicker/tree/master/example">Examples</a> and <a href="https://github.com/rsuite/rsuite-datepicker/blob/master/README.md">Docs</a> on Github.</p>
            <p>Bug reports or features request on <a href="https://github.com/rsuite/rsuite-datepicker/issues">here</a></p>
            <p><b> MIT License </b></p>
        </div>
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('render-target')
);
