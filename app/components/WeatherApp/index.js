import './index.scss';

import React, {createClass, PropTypes} from 'react';

import SearchLocation from 'containers/SearchLocation';
import LocationsList from 'containers/LocationsList';
import WeathersList from 'containers/WeathersList';

import {Logo, Button, Slider, ButtonReset} from 'components/common';
import {LOCATION_TYPE, MIN_PERIOD, MAX_PERIOD} from 'constants/index';
import {lifeCycle} from 'utils/index';

console.group('[LifeCycle] WeatherAppView');

const WeatherApp = createClass({
    mixins: [lifeCycle],

    propTypes: {
        defaultClassName: PropTypes.string,
        state: PropTypes.object.isRequired,
        handlerLocation: PropTypes.func.isRequired,
        handlerWeather: PropTypes.func.isRequired,
        handlerPeriod: PropTypes.func.isRequired,
        handleClear: PropTypes.func.isRequired,
        handlerRemove: PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return { defaultClassName: 'weather-app' };
    },

    renderLocationList: function() {
        return <LocationsList state={ this.props.state } handlerWeather={ this.props.handlerWeather }/>;
    },

    renderWeathersList: function() {
        return <WeathersList state={ this.props.state } handlerRemove={ this.props.handlerRemove } />;
    },

    getContent: function() {
        const {state} = this.props;
        let content = null;

        if (state.list.length) {
            content = (state.type === LOCATION_TYPE) ? this.renderLocationList() : this.renderWeathersList();
        } else {
            content = <div>No Results</div>;
        }

        return (content);
    },

    handlerUpdatePeriod: function(period = [], idx) {
        if (this.refs['periodStatus'] ){
            this.refs['periodStatus'].innerHTML = Math.ceil(period[idx]);
        }
    },

    handlerSubmit(e) {
        e.preventDefault();
    },

    render: function() {
        const {
            handlerLocation,
            handlerPeriod,
            defaultClassName,
            handleClear,
            state
        } = this.props;

        return (
            <div className={` ${defaultClassName}` }>
                <form className={` ${defaultClassName}__header` } onSubmit={ this.handlerSubmit }>
                    <div className={` ${defaultClassName}__logo` }>
                        <Logo />
                    </div>
                    <div className={` ${defaultClassName}__search` }>
                        <SearchLocation handlerLocation={handlerLocation}/>
                    </div>
                    <div className={` ${defaultClassName}__actions` }>
                        <div className={` ${defaultClassName}__actions-reset` }>
                            <ButtonReset type="reset" />
                        </div>
                        <div className={` ${defaultClassName}__actions-clear` }>
                            <Button onClick={handleClear}>
                                <i className="fa fa-trash-o">{''}</i>
                            </Button>
                        </div>
                    </div>
                </form>
                <div className={` ${defaultClassName}__content` }>
                    {this.getContent()}
                </div>
                <footer className={` ${defaultClassName}__footer` }>
                    <Slider
                        ref="slider"
                        connect="lower"
                        range={{min: MIN_PERIOD, max: MAX_PERIOD}}
                        start={[state.period]}
                        onChange={handlerPeriod}
                        onUpdate={this.handlerUpdatePeriod}
                    />
                    <div ref="periodStatus" className={` ${defaultClassName}__period` }>
                        {state.period}
                    </div>
                    <div className={` ${defaultClassName}__degrees` }>
                        <span>F</span> | <span>C</span>
                    </div>
                </footer>
            </div>
        )
    }
});

export default WeatherApp;
