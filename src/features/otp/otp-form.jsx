/* eslint-disable consistent-return */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "reactstrap";
import "./styles.css";

import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../components/custom-input";
import useCountDownTimer from "../../hooks/use-count-down-timer";

const inputs = Array.from({ length: 4 }, (_, i) => i);
const RE_DIGIT = /[0-9]/;
const initialValues = {
  "otp-input-0": "",
  "otp-input-1": "",
  "otp-input-2": "",
  "otp-input-3": "",
};

const threeMinutes = 3 * 60 * 1000;

const OtpForm = ({ handleOnSubmit, handleSendOtp, validOtp }) => {
  const deadline = new Date(Date.now() + threeMinutes);
  const buttonRef = useRef(null);
  const [isVerified, setIsVerified] = useState(null);

  const methods = useForm({
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  const focusToFirstInput = () => methods.setFocus(`otp-input-0`);

  useEffect(() => {
    focusToFirstInput();
  }, []);

  const resetAllFields = () => methods.reset(initialValues);

  const { minutes, seconds, resetTimer, stopTimer, isTimerStopped } =
    useCountDownTimer({
      deadline,
    });

  const handleResendOtp = () => {
    resetTimer();
    resetAllFields();
    focusToFirstInput();
    handleSendOtp();
  };

  const focusToNextInput = (inputId) => {
    const inputIndex = Number(inputId.split("-")[2]);

    if (inputIndex !== 3) {
      methods.setFocus(`otp-input-${inputIndex + 1}`);
      return;
    }

    const { activeElement } = document;
    if (activeElement?.id === "otp-input-3") {
      activeElement.blur();
      if (!isTimerStopped) buttonRef.current?.removeAttribute("disabled");
      buttonRef?.current?.focus();
    }
  };

  const focusToPrevInput = (inputId) => {
    const inputIndex = Number(inputId.split("-")[2]);
    if (inputIndex === 0) return;
    methods.setFocus(`otp-input-${inputIndex - 1}`);
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    const inputId = event.target.id;
    setIsVerified(null);
    if (!value) focusToPrevInput(inputId);
    else focusToNextInput(inputId);
  };

  const handleOnKeyPress = (event, index) => {
    const target = event.target;
    target.setSelectionRange(0, target.value.length);

    const isTargetValueDigit = RE_DIGIT.test(event.key);
    if (!isTargetValueDigit) {
      return event.preventDefault();
    }

    const inputId = `otp-input-${index}`;

    if (event.key === methods.getValues(inputId)) {
      event.preventDefault();
      focusToNextInput(inputId);
    }
  };

  const handleOnKeyDown = (e) => {
    const target = e.target;
    const inputId = target.id;

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    focusToPrevInput(inputId);
  };

  const handleOnFocus = (e, index) => {
    const target = e.target;
    target.setSelectionRange(0, target.value.length);
    methods.setFocus(`otp-input-${index}`);
  };

  const handleWrongOtp = () =>
    inputs.forEach((_, index) => {
      methods.setError(`otp-input-${index}`, {});
    });

  const handleVerifyOtp = (otp) => {
    if (otp === validOtp) {
      handleOnSubmit();
      stopTimer();
    } else {
      handleWrongOtp();
    }
  };

  const handleSubmit = (values) => {
    const otpValue = Object.values(values).join("").trim();

    handleVerifyOtp(otpValue);
  };

  const isInputIncorrect = Object.keys(methods.formState.errors).length === 4;
  const isInputEmpty = Object.values(methods.getValues()).some(
    (item) => item === ""
  );
  const showErrorMessage =
    isVerified !== null && !isVerified && isInputIncorrect;

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Row>
            <Col className="d-flex flex-row">
              {inputs.map((_, inputIndex) => (
                <CustomInput
                  key={`otp-input-${inputIndex}`}
                  name={`otp-input-${inputIndex}`}
                  maxLength={1}
                  type="text"
                  onKeyPress={(e) => handleOnKeyPress(e, inputIndex)}
                  onKeyDown={handleOnKeyDown}
                  onChange={handleOnChange}
                  focus={(e) => handleOnFocus(e, inputIndex)}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column">
              <p className="mt-4">
                Time Remaining: {minutes}:{seconds}
              </p>
              {showErrorMessage ? <p>Code is incorrect</p> : null}
              <button
                className="btn btn-primary my-4"
                ref={buttonRef}
                name="submit"
                type="submit"
                disabled={isInputIncorrect || isTimerStopped || isInputEmpty}
              >
                <span>Verify</span>
              </button>
            </Col>
          </Row>
        </Form>
      </FormProvider>
      <p className="resend" onClick={handleResendOtp}>
        Didn&rsquo;t receive the OTP code? Resend code
      </p>
    </>
  );
};

OtpForm.propTypes = {
  validOtp: PropTypes.string.isRequired,
  handleSendOtp: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
};

export default OtpForm;
