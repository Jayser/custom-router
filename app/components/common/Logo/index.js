import './index.scss';

import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Logo = ({className, children, ...props}) => (
  <div className={classNames(className, 'font-poppins')} {...props}>
    {children ? children : 'WEATHER'}
  </div>
);

Logo.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
};

Logo.defaultProps = {
  className: 'logo'
};

export default Logo;
