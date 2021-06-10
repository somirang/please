import React from "react";
import { FormattedMessage } from "react-intl";
import "./Button.scss";

export interface ButtonProps {
  text: string;
  textId?: string;
  theme: string;
  shape: string;
  size?: string;
  onClick?: () => void;
  style?: any;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <div
      className={`button-container ${
        props.isDisabled ? "disabled" : props.theme
      } ${props.shape} ${props.size ? props.size : ""}`}
      onClick={props.isDisabled || props.isLoading ? () => {} : props.onClick}
      style={props.style ? props.style : null}
    >
      {props.isLoading ? (
        <div
          className={`button-spinner ${props.size ? props.size : ""} ${
            props.theme ? props.theme : ""
          }`}
        />
      ) : props.textId ? (
        <FormattedMessage id={props.textId} />
      ) : (
        props.text
      )}
    </div>
  );
};

export default Button;
