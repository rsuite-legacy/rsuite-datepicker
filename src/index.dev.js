/*eslint-disable*/

import React from 'react';
import { render } from 'react-dom';
import Component from './index.js';
import style from '../style/Default.less';

let renderTarget = document.createElement('div');
renderTarget.id = 'renderTarget';

render(
    <Component />,
    renderTarget,
    () => {
        document.body.appendChild(renderTarget);
        console.log('==== Everything is good! ====');
    }
);

// Hot module reload
if(module.hot) module.hot.accept();
