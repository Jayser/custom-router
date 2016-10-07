import './index.scss';

import React from 'react';

const Button = (props) => (
    <button className={props.className} {...props}>
        {props.children}
    </button>
);

Button.propTypes = {
    children: React.PropTypes.element,
    className: React.PropTypes.string
};

Button.defaultProps = {
    className: 'btn'
};

export default Button;

