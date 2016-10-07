import './assets/scss/index.scss';

import React from 'react';
import {render} from 'react-dom';

import WeatherApp from 'containers/WeatherApp';

render(
    <WeatherApp />,
    document.getElementById('app')
);
