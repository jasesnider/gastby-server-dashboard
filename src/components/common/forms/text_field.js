import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  margin: 10px 0;
  color: red;
`;

const TextField = props => {
  const {
    value,
    cssId,
    name,
    label,
    className,
    placeholder,
    prepend,
    append,
    touched,
    required,
    onChangeHandler,
  } = props;
  return (
    <Fragment>
      <label htmlFor={name}>
        {label}
        {required ? '*' : ''}
      </label>
      <div className="input-group mt-3 mb-3">
        {prepend && (
          <div className="input-group-prepend">
            <span className="input-group-text" id={prepend + name}>
              {prepend}
            </span>
          </div>
        )}
        <input
          id={cssId}
          name={name}
          className={`form-control ${className}`}
          type="text"
          value={value}
          required={required}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby={className + name}
          onChange={event => onChangeHandler(event)}
        />
        {append && (
          <div className="input-group-append" id={append + name}>
            <span className="input-group-text">{append}</span>
          </div>
        )}
        <ErrorMessage>
          {touched && required && !value ? 'This field is required.' : ''}
        </ErrorMessage>
      </div>
    </Fragment>
  );
};

TextField.defaultProps = {
  required: false,
  touched: false,
  id: '',
  prepend: '',
  append: '',
};

TextField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  touched: PropTypes.bool,
  prepend: PropTypes.string,
  append: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default TextField;
