import './index.scss';

import React from 'react';

const ButtonReset = (props) => (
    <input type="reset" className={props.className} value="Clear" {...props} />
);

ButtonReset.propTypes = {
    className: React.PropTypes.string
};

ButtonReset.defaultProps = {
    className: 'reset-btn'
};

export default ButtonReset;

