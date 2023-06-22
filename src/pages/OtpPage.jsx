import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import OtpForm from "../features/otp/otp-form";

const OtpPage = () => {
  const [validOtp, setValidOtp] = useState("");
  const handleOnSubmit = () => alert("success");

  const handleSendOtp = () => {
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    alert(`Your OTP is ${otp}. This message is also in the console.`);
    console.log(`Your OTP is ${otp}`);
    setValidOtp(otp);
  };

  useEffect(() => {
    handleSendOtp();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <h1>Ready to create the future?</h1>
          <p>
            Your verification code has been sent to your email address. Please
            enter the code:
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <OtpForm
            handleOnSubmit={handleOnSubmit}
            handleSendOtp={handleSendOtp}
            validOtp={validOtp}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default OtpPage;
