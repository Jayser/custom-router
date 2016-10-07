import './index.scss';

import React, {createClass, PropTypes} from 'react';
import classNames from 'classnames';

import {lifeCycle} from 'utils/index';

console.group('[LifeCycle] LocationItem');

const LocationItem = createClass({
    mixins: [lifeCycle],

    propTypes: {
        formatted_address: PropTypes.string.isRequired,
        geometry: PropTypes.object.isRequired,
        defaultClassName: PropTypes.string,
        className: PropTypes.string,
        handlerWeather: PropTypes.func.isRequired
    },

    getDefaultProps: function () {
        return {
            defaultClassName: 'location__item'
        }
    },

    render() {
        const {
            formatted_address,
            className,
            defaultClassName,
            geometry,
            handlerWeather
        } = this.props;

        return (
            <li className={classNames(defaultClassName, className)}
                data-name={formatted_address}
                data-longitude={geometry.location.lng}
                data-latitude={geometry.location.lat}
                onClick={handlerWeather}>
                {formatted_address}
            </li>
        )
    }

});

export default LocationItem;
