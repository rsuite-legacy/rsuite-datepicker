import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../src';
import '../style/Default.less';
import './app.less';

const App = (props) => (
    <div>
        <div className="field">
            <DatePicker dateFormat="YYYY-MM-DD" />
        </div>
        <div className="field">
            <DatePicker dateFormat="YYYY-MM-DD HH:mm:ss" />
        </div>
        <div className="field">
            <DatePicker dateFormat="HH:mm:ss" />
        </div>
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('render-target')
);
