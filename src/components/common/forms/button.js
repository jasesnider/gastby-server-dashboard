import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  cursor: ${props => (props.disabled ? 'not-allowed' : '')};
`;

const Button = props => {
  const {
    buttonType,
    label,
    name,
    outline,
    buttonSize,
    disabled,
    className,
    type,
    onClickHandler
  } = props;
  const size = buttonSize ? `btn-${buttonSize}` : '';

  return (
    <ButtonWrapper
      name={name}
      type={type}
      className={`btn btn-${
        outline ? 'outline-' : ''
      }${buttonType} ${size} ${className}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {label}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  type: 'button',
  className: '',
  buttonSize: '',
  buttonType: ''
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  outline: PropTypes.bool,
  className: PropTypes.string,
  buttonSize: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired
};

export default Button;
