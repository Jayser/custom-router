import React from 'react';
import { render } from 'react-dom';
import router from './utils/router';

console.log(router);
window.router = router;

render(
    React.createElement('div', null, 'text'),
    document.getElementById('app')
);

