import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, useHistory, useLocation } from "react-router";
import { useAuthContext } from "../auth/auth";
import Button from "../components/Button/Button";
import UnderlinedButton from "../components/Button/UnderlinedButton";
import InfoInput from "../components/Input/InfoInput";
import { RootState } from "../store";
import { parseQuery, phoneLocaleList } from "../utils";
import "./SignIn.scss";
import { FormattedMessage } from "react-intl";

const SignIn = (props: RouteComponentProps) => {
  const auth = useAuthContext();
  const location = useLocation();
  const [phoneLocale, setPhoneLocale] = useState(phoneLocaleList[0].value);
  const [phoneDigit, setPhoneDigit] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.current);
  const history = useHistory();

  useEffect(() => {
    const nextLoc = parseQuery(location.search)["next"];
    if (user !== {} && nextLoc) {
      history.push(nextLoc);
    }
  }, []);

  useEffect(() => {
    // Determines phone number i.e. username
    const fullPhone = phoneLocale + phoneDigit;
    setPhone(fullPhone);
  }, [phoneLocale, phoneDigit]);

  const signInHandler = () => {
    setSignInLoading(true);
    auth
      ?.authenticate(phone, password)
      .then(() => {
        const nextLoc = parseQuery(location.search)["next"];
        if (nextLoc) {
          props.history.push(nextLoc);
        } else {
          props.history.push("/mypage");
        }
      })
      .catch((err) => {
        setSignInLoading(false);
        console.error(err);
      });
  };

  return (
    <div className="signin-page-container">
      <div className="signin-page-title">
        <FormattedMessage id="logIn.msg" />
      </div>
      <InfoInput
        title="Phone number"
        titleId="logIn.phone"
        type="tel"
        value={phoneDigit}
        onChange={(e) => setPhoneDigit(e.target.value)}
        optionVals={phoneLocaleList.map((obj) => obj.value)}
        optionKeys={phoneLocaleList.map((obj) => obj.icon + " " + obj.value)}
        onSelectChange={(e) => setPhoneLocale(e.target.value)}
      />
      <InfoInput
        title="Password"
        titleId="logIn.Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="signin-forgot-passwd-text">
        <UnderlinedButton
          text="Forgot password?"
          textId="logIn.forgotYourPassword"
          onClick={() => props.history.push("/forgotPasswd")}
        />
      </div>
      <Button
        text="Sign In"
        textId="button.signIn"
        theme="primary"
        shape="round"
        onClick={signInHandler}
        isLoading={signInLoading}
      />
      <div className="signin-signup-text">
        <div className="signin-signup-desc">
          <FormattedMessage id="logIn.notMember" />
        </div>
        <UnderlinedButton
          text="Sign up"
          textId="logIn.signUp"
          onClick={() => props.history.push("/signup")}
        />
      </div>
    </div>
  );
};

export default SignIn;
