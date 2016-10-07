import './index.scss';

import React, {createClass, PropTypes} from 'react';
import classNames from 'classnames';

import {FIRST_ELEMENT} from 'constants/index';
import {closest, lifeCycle} from 'utils/index';

console.group('[LifeCycle] WeatherItem');

const WeatherItem = createClass({
    mixins: [lifeCycle],

    propTypes: {
        weather: PropTypes.object.isRequired,
        handlerRemove: PropTypes.func.isRequired,
        defaultClassName: PropTypes.string,
        className: PropTypes.string
    },

    getDefaultProps: function () {
        return {
            defaultClassName: 'weather__item'
        };
    },

    toggle: function (e) {
        const hideClass = 'weather-period__hide';
        const target = closest(e.target, '.weather__item').nextSibling;
        if (target) {
            target.classList.toggle(hideClass);
        }
    },

    render: function () {
        const {weather = {}, handlerRemove, defaultClassName, className} = this.props;
        const currentlyWeather = weather.daily && weather.daily.data && weather.daily.data[FIRST_ELEMENT] || {};
        const temperature = `
            Min ${~~currentlyWeather.temperatureMin} °C
            -
            Max ${~~currentlyWeather.temperatureMax} °C
        `;
        return (
            <div className={classNames(defaultClassName, className)} onClick={this.toggle}>
                <div className={classNames(`${defaultClassName}-icon`)}>
                    <canvas id={`${currentlyWeather.icon}-${currentlyWeather.time}`} width="60" height="60"></canvas>
                </div>
                <div className={classNames(`${defaultClassName}-info`)}>
                    <div className={classNames(`${defaultClassName}-location`)}>{weather.name}</div>
                    <div className={classNames(`${defaultClassName}-summary`)}>{currentlyWeather.summary}</div>
                    <div className={classNames(`${defaultClassName}-temperature`)}>
                        {`Currently ${~~weather.currently.temperature} °C, ${temperature}`}
                    </div>
                </div>
                <i className={classNames(`${defaultClassName}-remove`)} onClick={() => handlerRemove(currentlyWeather.time)}>X</i>
            </div>
        );
    }
});

export default WeatherItem;
