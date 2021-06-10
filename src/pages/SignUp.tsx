import React, { useState, useEffect } from "react";
import UserPool, { getUser, toUserPoolAttr } from "../aws/UserPool";
import Button from "../components/Button/Button";
import InfoInput from "../components/Input/InfoInput";
import { useAuthContext } from "../auth/auth";
import "./SignUp.scss";
import { phoneLocaleList } from "../utils";
import { RouteComponentProps } from "react-router";
import CheckBox from "../components/Input/CheckBox";
import { postUser } from "../api/user";
import { FormattedMessage } from "react-intl";

interface FormProps {
  setSubmitReady: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpForm = (props: FormProps) => {
  const auth = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneLocale, setPhoneLocale] = useState(phoneLocaleList[0].value);
  const [phoneDigit, setPhoneDigit] = useState("");
  const [cachedPhone, setCachedPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [codeRecvInProgress, setCodeRecvInProgress] = useState(false);
  const [isConfirmCodeInProgress, setIsConfirmCodeInProgress] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    // Decides when submit button should become available
    if (isConfirmed && isAgreed) {
      props.setSubmitReady(true);
    } else {
      props.setSubmitReady(false);
    }
  });

  useEffect(() => {
    // Determines phone number i.e. username
    const fullPhone = phoneLocale + phoneDigit;
    setPhone(fullPhone);
  }, [phoneLocale, phoneDigit]);

  const isReadyToSignUp = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      password === rePassword
    );
  };
  const signUpHandler = () => {
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedName = name.trim();
    setCodeRecvInProgress(true);
    const emailAttr = toUserPoolAttr("email", trimmedEmail);
    const phoneAttr = toUserPoolAttr("phone_number", trimmedPhone);
    UserPool.signUp(
      trimmedPhone,
      password,
      [emailAttr, phoneAttr],
      [],
      async (err, result) => {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", result);
          setCachedPhone(trimmedPhone);
          setPhone(trimmedPhone);
          setEmail(trimmedEmail);
          setName(trimmedName);
          // TODO: show error modal when failed
          await postUser({
            sub: result!.userSub,
            phone: trimmedPhone,
            email: trimmedEmail,
            name: trimmedName,
          });
          setIsCodeSent(true);
        }
        setCodeRecvInProgress(false);
      },
    );
  };

  const resendCodeHandler = () => {
    setCodeRecvInProgress(true);
    const congitoUser = getUser(cachedPhone);
    congitoUser.resendConfirmationCode((err) => {
      if (err) {
        console.error(err);
      } else {
        setCodeRecvInProgress(false);
      }
    });
  };

  const confirmCodeHandler = () => {
    setIsConfirmCodeInProgress(true);
    const cognitoUser = getUser(phone);
    cognitoUser.confirmRegistration(code, false, (err, data) => {
      if (err) {
        console.error(err);
        setIsConfirmCodeInProgress(false);
      } else {
        auth
          ?.authenticate(phone, password)
          .then((res) => {
            console.log("Authenticated!", res);
            setIsConfirmed(true);
          })
          .catch((err) => {
            console.error("Failed to authenticate!", err);
          })
          .finally(() => {
            setIsConfirmCodeInProgress(false);
          });
      }
    });
  };

  return (
    <div className="signup-form-container">
      <InfoInput
        title="Name"
        titleId="signUp.name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InfoInput
        title="Email"
        titleId="signUp.email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InfoInput
        title="Password (at least 8 characters)"
        titleId="signUp.password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InfoInput
        title="Re-enter password"
        titleId="signUp.reEnterPassword"
        type="password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
      />
      <InfoInput
        title="Phone number"
        titleId="signUp.phoneNumber"
        type="tel"
        value={phoneDigit}
        onChange={(e) => setPhoneDigit(e.target.value)}
        buttonText={
          isCodeSent && phone === cachedPhone ? "재전송" : "코드 전송"
        }
        buttonTextId={
          isCodeSent && phone === cachedPhone
            ? "button.reSend"
            : "button.sendCode"
        }
        buttonDisabled={!isReadyToSignUp()}
        onButtonClick={
          isCodeSent && phone === cachedPhone
            ? resendCodeHandler
            : signUpHandler
        }
        buttonLoading={codeRecvInProgress}
        optionVals={phoneLocaleList.map((obj) => obj.value)}
        optionKeys={phoneLocaleList.map((obj) => obj.icon + " " + obj.value)}
        onSelectChange={(e) => setPhoneLocale(e.target.value)}
      />
      {isCodeSent && (
        <InfoInput
          title="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          buttonText={isConfirmed ? "" : "확인"}
          onButtonClick={confirmCodeHandler}
          buttonDisabled={!isReadyToSignUp() || code === ""}
          disabled={isConfirmed}
          width="calc(100% - 144px)"
          buttonLoading={isConfirmCodeInProgress}
          showConfirmed={isConfirmed}
        />
      )}
      <div className="signup-term-agree-container">
        <div className="signup-term-checkbox-container">
          <CheckBox value={isAgreed} onChange={() => setIsAgreed(!isAgreed)} />
        </div>
        <FormattedMessage id="signUp.privacy" />
      </div>
    </div>
  );
};

const SignUp = (props: RouteComponentProps) => {
  const [isSignUpReady, setIsSignUpReady] = useState(false);
  return (
    <div className="signup-page-container">
      <div className="signup-page-title">
        <FormattedMessage id="signUp.user" />
      </div>
      <SignUpForm setSubmitReady={setIsSignUpReady} />
      <div className="signup-footer-container">
        <Button
          text="Sign Up"
          textId="button.signUp"
          theme="primary"
          shape="round"
          isDisabled={!isSignUpReady}
          onClick={() => props.history.push("/landing")}
        />
      </div>
    </div>
  );
};

export default SignUp;
