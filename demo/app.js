import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../src';
import '../style/Default.less';
import './app.less';

const App = (props) => (
    <div>
        <DatePicker />
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('render-target')
);
