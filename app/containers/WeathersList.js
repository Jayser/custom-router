import React, {createClass, PropTypes} from 'react';
import Skycons from 'skycons';
import classNames from 'classnames';

import {random} from 'utils/index';

import WeatherItem from 'components/WeatherItem';
import WeatherPeriodItem from 'components/WeatherPeriodItem';
import {MIN_PERIOD, ICON_COLOR} from 'constants/index';
import {lifeCycle} from 'utils/index';

console.group('[LifeCycle] WeatherList');

const WeatherList = createClass ({
    mixins: [lifeCycle],

    propTypes: {
        state: PropTypes.object.isRequired,
        className: PropTypes.string,
        defaultClassName: PropTypes.string,
        handlerRemove: PropTypes.func.isRequired
    },

    getDefaultProps: function() {
      return {
          defaultClassName: 'weather-list'
      }
    } ,

    componentWillMount: function() {
        Skycons(window);
        this.skyCons = new (Skycons(window))({"color": ICON_COLOR});
    },

    handlerSkyCons: function(action) {
        this.props.state.list.forEach(({daily = {}}) => {
            const weathers = daily.data || [];
            weathers.forEach(weather => {
                const iconName = `${weather.icon}-${weather.time}`;
                this.skyCons[action](iconName, weather.icon);
            });
        });
        this.skyCons.play();
    },

    componentDidMount: function() {
        this.handlerSkyCons('add');
    },

    componentDidUpdate: function() {
        this.handlerSkyCons('add');
    },

    componentWillUnmount: function() {
        this.handlerSkyCons('remove');
    },

    handlerWeatherPeriod: function(el) {
        if(el) {
            el.style.height = `${el.offsetHeight}px`;
        }
    },

    renderForPeriod: function({daily = {}}) {
        const weatherOnWeek = (daily.data && daily.data) || [];
        const {state} = this.props;
        const perDays = state.period + MIN_PERIOD;

        if (state.period <= MIN_PERIOD) { return; }

        return (
            <div ref={this.handlerWeatherPeriod} className={classNames(`weather-period`)}>
                {weatherOnWeek.slice(MIN_PERIOD, perDays).map((forDay, num) => (
                    <WeatherPeriodItem key={random()} dayNum={num} weather={forDay} />
                ))}
            </div>
        )
    },

    renderContent: function(weather) {
        return (
            <div key={random()} className={classNames(`${this.props.defaultClassName}__wrapper`)}>
                <WeatherItem weather={weather} handlerRemove={this.props.handlerRemove} />
                {this.renderForPeriod(weather)}
            </div>
        );
    },

    render: function() {
        const {state, defaultClassName, className} = this.props;
        return (
            <div className={classNames(defaultClassName, className)}>
                {state.list.map(this.renderContent)}
            </div>
        );
    }
});

export default WeatherList;
