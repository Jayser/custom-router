import "./Slider.scss";

import React, {createClass} from 'react';
import Nouislider from 'react-nouislider';

const Slider = createClass({
    render: function () {
        return <Nouislider ref="slider" {...this.props} />
    }
});

export default Slider;
