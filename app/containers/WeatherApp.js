import React, {createClass} from 'react';
import Immutable from 'Immutable';
import store from 'store';

import {getWeathers} from 'services/weatherService';
import WeatherAppView from 'components/WeatherApp';
import {lifeCycle} from 'utils/index';

import {
    CELSIUS,
    FIRST_ELEMENT,
    LOCATION_TYPE,
    TYPE_WEATHER,
    MIN_PERIOD
} from 'constants/index';

console.group('[LifeCycle] WeatherApp');

const WeatherApp = createClass({
    mixins: [lifeCycle],

    getInitialState: function() {
        return {
            type: '',
            measure: CELSIUS,
            period: 1,
            list: store.get(TYPE_WEATHER) || []
        }
    },

    // pre-populate
    componentWillMount: function() {
        const { list } = this.state;
        const hasWeathers = Boolean(list.length);

        if (hasWeathers) {
            getWeathers(list, this.handlerWeathers);
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        const prevState = Immutable.fromJS(this.state);
        const isShouldUpdate = !Immutable.is(prevState, prevState.merge(nextState));

        return isShouldUpdate;
    },

    handlerWeathers: function(weathers) {
        // save to storage for pre-populate
        store.set(TYPE_WEATHER, weathers);

        this.setState({
            ...this.state,
            type: TYPE_WEATHER,
            list: store.get(TYPE_WEATHER)
        });
    },

    handlerPeriod: function(period = [], idx) {
        this.setState({
            ...this.state,
            period: Number(period[idx]) || MIN_PERIOD
        });
    },

    handlerWeather: function(weather) {
        const collection = (store.get(TYPE_WEATHER) || []).concat(weather);

        // save to storage for pre-populate
        store.set(TYPE_WEATHER, collection);

        this.setState({
            ...this.state,
            type: TYPE_WEATHER,
            list: store.get(TYPE_WEATHER)
        });
    },

    handlerLocation: function(locations) {
        this.setState({
            ...this.state,
            type: LOCATION_TYPE,
            list: locations
        });
    },

    handlerRemove: function(time) {
        const newState = store.get(TYPE_WEATHER).filter(weather => {
            return weather.daily.data[FIRST_ELEMENT].time !== time;
        });

        store.set(TYPE_WEATHER, newState);

        this.setState({
            ...this.state,
            type: TYPE_WEATHER,
            list: store.get(TYPE_WEATHER)
        });
    },

    handlerClear: function() {
        store.clear();
        this.setState({
            type: '',
            period: 1,
            list: []
        });
    },

    render: function() {
        return (
            <WeatherAppView
                state={this.state}
                handleClear={this.handlerClear}
                handlerLocation={this.handlerLocation}
                handlerPeriod={this.handlerPeriod}
                handlerRemove={this.handlerRemove}
                handlerWeather={this.handlerWeather}
            />
        );
    }
});

export default WeatherApp;
