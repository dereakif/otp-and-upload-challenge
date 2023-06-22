import PropTypes from "prop-types";
import { useRef, useState } from "react";

import { useFormContext } from "react-hook-form";

const CustomInput = ({
  name,
  type,
  maxLength,
  focus,
  onChange,
  onKeyPress,
  onKeyDown,
}) => {
  const input = useRef(null);
  const [focused, setFocused] = useState(false);

  const inputChange = (e) => {
    onChange && onChange(e);
  };

  const inputFocus = (e) => {
    setFocused(true);
    focus && focus(e);
  };

  const inputBlur = () => {
    setFocused(false);
  };

  const keyPress = (e) => {
    e.key === "Enter" && e.preventDefault();
    onKeyPress && onKeyPress(e);
  };

  const keyDown = (e) => {
    onKeyDown && onKeyDown(e);
  };

  const { register, formState } = useFormContext();

  const { ref, ...rest } = register(name, {
    onChange: (e) => {
      inputChange(e);
    },
    onBlur: (e) => {
      inputBlur(e);
    },
  });

  return (
    <input
      className={`input ${focused ? "focused" : ""} ${
        formState.errors[name] ? "error" : ""
      }`}
      id={name}
      type={type}
      onKeyPress={(e) => keyPress(e)}
      onKeyDown={(e) => keyDown(e)}
      maxLength={maxLength}
      onFocus={(e) => inputFocus(e)}
      {...rest}
      ref={(e) => {
        ref(e);
        input.current = e;
      }}
      onChange={(e) => {
        onChange && onChange(e);
      }}
      autoComplete="off"
    />
  );
};

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  numeric: PropTypes.bool,
  alphanumeric: PropTypes.bool,
  housing: PropTypes.bool,
  maxLength: PropTypes.number,
  clearField: PropTypes.bool,
  focus: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyDown: PropTypes.func,
  newValue: PropTypes.string,
};

export default CustomInput;
