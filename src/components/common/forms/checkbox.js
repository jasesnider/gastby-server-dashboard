import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const { name, value, label, className, checked, onChangeHandler } = props;
  return (
    <div className="form-group form-check mt-3 mb-3">
      <input
        className={`form-check-input ${className}`}
        id={name}
        name={name}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={event => onChangeHandler(event)}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Checkbox;
