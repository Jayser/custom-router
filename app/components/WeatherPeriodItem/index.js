import './WeatherPeriodItem.scss';

import React, {createClass, PropTypes} from 'react';
import classNames from 'classnames';

import {getDayOfWeekByOffset, lifeCycle, nextDateFormat} from 'utils/index';

console.group('[LifeCycle] WeatherPeriodItem');

const WeatherPeriodItem = createClass({
    mixins: [lifeCycle],

    propTypes: {
        weather: PropTypes.object.isRequired,
        defaultClassName: PropTypes.string,
        className: PropTypes.string,
        dayNum: PropTypes.number
    },

    getDefaultProps: function () {
        return {defaultClassName: 'weather-period'}
    },

    render: function () {
        const {weather = {}, dayNum = 0, defaultClassName, className} = this.props;

        const temperature = `
            ${~~weather.temperatureMin} °C
            -
            ${~~weather.temperatureMax} °C
        `;

        return (
            <div ref="weather-weather" className={classNames(`${defaultClassName}__wrapper`, className)}>
                <div className={classNames(`${defaultClassName}__icon`)}>
                    <canvas id={`${weather.icon}-${weather.time}`} width="20" height="20"></canvas>
                </div>
                <div className={classNames(`${defaultClassName}__temperature`)}>
                    {temperature}
                </div>
                <div className={classNames(`${defaultClassName}__summary`)}>{weather.summary}</div>
                <div className={classNames(`${defaultClassName}__date`)}>
                    <div className={classNames(`${defaultClassName}__day-of-week`)}>
                        {getDayOfWeekByOffset(dayNum)}
                    </div>
                    <div className={classNames(`${defaultClassName}__date-format`)}>
                        {nextDateFormat(dayNum)}
                    </div>
                </div>
            </div>
        )
    }
});

export default WeatherPeriodItem;
