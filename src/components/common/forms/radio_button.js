import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = props => {
  const { id, name, value, label, className, onChangeHandler } = props;
  return (
    <div className="form-check mt-3 mb-3">
      <label className="form-check-label" htmlFor={name}>
        <input
          className={`form-check-input ${className}`}
          id={id}
          name={name}
          type="radio"
          value={value}
          onChange={event => onChangeHandler(event)}
        />
        {label}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default RadioButton;
