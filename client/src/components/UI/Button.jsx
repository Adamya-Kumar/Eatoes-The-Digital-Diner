import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component that uses the custom button styles
 * @param {string} variant - primary, secondary, outline
 * @param {string} size - sm, md (default), lg
 * @param {boolean} block - full width button
 * @param {function} onClick - click handler
 * @param {string} type - button type (button, submit)
 * @param {boolean} disabled - is button disabled
 * @param {node} children - button content
 * @param {string} className - additional CSS classes
 */
const Button = ({
  variant = 'primary',
  size = '',
  block = false,
  onClick,
  type = 'button',
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    block ? 'btn-block' : '',
    className
  ].filter(Boolean).join(' ');
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button component with consistent styling
 * @param {string} variant - primary, secondary, outline, auth, logout
 * @param {string} size - sm, md (default), lg
 * @param {boolean} block - full width button
 * @param {function} onClick - click handler
 * @param {string} type - button type
 * @param {boolean} disabled - disabled state
 * @param {node} children - button content
 * @param {string} className - additional classes
 */
const Button = ({
  variant = 'primary',
  size = '',
  block = false,
  onClick,
  type = 'button',
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    block ? 'btn-block' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'auth', 'logout']),
  size: PropTypes.oneOf(['sm', '', 'lg']),
  block: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', '', 'lg']),
  block: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
