import React, {createClass, PropTypes} from 'react';

import LocationItem from 'components/LocationItem';
import weatherService from 'services/weatherService';
import {lifeCycle} from 'utils/index';

console.group('[LifeCycle] LocationList');

const LocationList = createClass({
    mixins: [lifeCycle],
    
    propTypes: {
        state: PropTypes.object.isRequired,
        handlerWeather: PropTypes.func.isRequired
    },

    handlerWeather: function({target}) {
        weatherService(target.dataset, (weather) => {
            this.props.handlerWeather(weather);
        });
    },

    render: function() {
        return (
            <ul className="location-list">
                {
                    this.props.state.list.map((item, idx) => {
                        return (<LocationItem key={idx} handlerWeather={this.handlerWeather} {...item} />)
                    })
                }
            </ul>
        );
    }
});

export default LocationList;
