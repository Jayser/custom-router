import './index.scss';

import React from 'react';

const Input = (props) => (
    <input className={`${props.className}`} {...props} />
);

Input.propTypes = {
    className: React.PropTypes.string
};

Input.defaultProps = {
    className: 'input'
};

export default Input;
