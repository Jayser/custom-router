import React, {createClass, PropTypes} from 'react';

import getLocation from 'services/geoLocationService';
import {DELAY_TO_EXECUTE} from 'constants/index';

import {Input} from 'components/common';
import {delay, lifeCycle} from 'utils/index';

console.group('[LifeCycle] SearchLocation');

const SearchLocation = createClass ({
    mixins: [lifeCycle],

    propTypes: {
        handlerLocation: PropTypes.func.isRequired
    },

    changeState: function(data) {
        this.props.handlerLocation(data.results);
    },

    submitHandler: function({target}) {
        delay(() => {
            if (!target.value) { return; }
            getLocation(target.value, ({data}) => this.changeState(data));
        }, DELAY_TO_EXECUTE);
    },

    render: function() {
        return <Input
            type="text"
            id="google-place-auto-complete"
            placeholder="Enter a location"
            onChange={(e) => this.submitHandler(e) }/>;
    }
});


export default SearchLocation;
