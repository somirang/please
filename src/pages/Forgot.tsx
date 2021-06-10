import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useAuthContext } from "../auth/auth";
import { getUser } from "../aws/UserPool";
import Button from "../components/Button/Button";
import InfoInput from "../components/Input/InfoInput";
import { phoneLocaleList } from "../utils";
import "./Forgot.scss";
import { FormattedMessage } from "react-intl";

const Forgot = (props: RouteComponentProps) => {
  const auth = useAuthContext();
  const [phoneDigit, setPhoneDigit] = useState("");
  const [phoneLocale, setPhoneLocale] = useState("");
  const [phone, setPhone] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [cachedPhone, setCachedPhone] = useState("");
  const [codeRecvInProgress, setCodeRecvInProgress] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isChangePwdInProgress, setIsChangePwdInProgress] = useState(false);

  useEffect(() => {
    // Determines phone number i.e. username
    const fullPhone = phoneLocale + phoneDigit;
    setPhone(fullPhone);
  }, [phoneLocale, phoneDigit]);

  const forgotPasswdHandler = () => {
    setCodeRecvInProgress(true);
    getUser(phone).forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccsess:", data);
      },
      onFailure: (err) => {
        setCodeRecvInProgress(false);
        console.error("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        setCachedPhone(phone);
        setIsCodeSent(true);
        setCodeRecvInProgress(false);
      },
    });
  };

  const resendCodeHandler = () => {
    setCodeRecvInProgress(true);
    getUser(cachedPhone).resendConfirmationCode((err) => {
      if (err) {
        console.error(err);
      } else {
        setCodeRecvInProgress(false);
      }
    });
  };

  const changePasswdHandler = () => {
    setIsChangePwdInProgress(true);
    // TODO: show Error message if password and rePassword are different
    getUser(cachedPhone).confirmPassword(code, password, {
      onSuccess: () => {
        auth
          ?.authenticate(cachedPhone, password)
          .then(() => {
            props.history.push("/mypage");
          })
          .catch((err) => {
            setIsChangePwdInProgress(false);
            console.error(err);
          });
      },
      onFailure: (err) => {
        setIsChangePwdInProgress(false);
        console.error("onFailure:", err);
      },
    });
  };

  return (
    <div className="forgot-page-container">
      <div className="forgot-page-title">
        <FormattedMessage id="logIn.forgotYourPassword" />
      </div>
      <div className="forgot-page-sub-title">
        <FormattedMessage id="forget.text" />
      </div>
      <InfoInput
        title="Phone number"
        titleId="logIn.phone"
        type="tel"
        value={phoneDigit}
        onChange={(e) => setPhoneDigit(e.target.value)}
        buttonText={
          isCodeSent && phone === cachedPhone ? "재전송" : "코드 전송"
        }
        buttonDisabled={phoneDigit === ""}
        onButtonClick={
          isCodeSent && phone === cachedPhone
            ? resendCodeHandler
            : forgotPasswdHandler
        }
        buttonLoading={codeRecvInProgress}
        optionVals={phoneLocaleList.map((obj) => obj.value)}
        optionKeys={phoneLocaleList.map((obj) => obj.icon + " " + obj.value)}
        onSelectChange={(e) => setPhoneLocale(e.target.value)}
      />
      {isCodeSent && (
        <>
          <InfoInput
            title="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            width="calc(100% - 144px)"
          />
          <InfoInput
            title="New password (at least 8 characters)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InfoInput
            title="Re-enter new password"
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <Button
            text="Change password"
            textId="button.changePassword"
            shape="round"
            theme="primary"
            isDisabled={
              code === "" ||
              password === "" ||
              rePassword === "" ||
              password !== rePassword
            }
            isLoading={isChangePwdInProgress}
            onClick={changePasswdHandler}
          />
        </>
      )}
    </div>
  );
};

export default Forgot;
