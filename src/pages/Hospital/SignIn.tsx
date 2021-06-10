import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getHospital } from "../../api/hospital";
import Button from "../../components/Button/Button";
import InfoInput from "../../components/Input/InfoInput";
import Modal from "../../components/Modal/Modal";
import { setHospital } from "../../store/reducers/hospital";
import "./SignIn.scss";

const SignIn = () => {
  const [pinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInErrorModal, setShowSignInErrorModal] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    setIsLoading(true);
    const hospitalData = await getHospital({ hid: pinCode });
    if (hospitalData) {
      const hospital = hospitalData.result;
      dispatch(setHospital(hospital));
    } else {
      setIsLoading(false);
      setShowSignInErrorModal(true);
    }
  };

  return (
    <div className="hospital-sign-in-background">
      <div className="hospital-sign-in-container">
        <div className="hospital-sign-in-input-container">
          <InfoInput
            title="Enter hospital PIN code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <div className="hospital-sign-in-submit-button-container">
          <Button
            text="Submit"
            shape="square"
            theme="primary"
            size="small"
            isDisabled={pinCode === ""}
            onClick={submitHandler}
            isLoading={isLoading}
          />
        </div>
      </div>
      {showSignInErrorModal && (
        <Modal
          openController={setShowSignInErrorModal}
          header="Sign In Failed"
          body="Please check your PIN number and try again."
        />
      )}
    </div>
  );
};

export default SignIn;
