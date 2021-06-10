import React from "react";
import { FormattedMessage } from "react-intl";
import "./UnderlinedButton.scss";

interface Props {
  text: string;
  textId?: string;
  onClick?: () => void;
}

const UnderlinedButton = (props: Props) => {
  return (
    <div className="underlined-button-container" onClick={props.onClick}>
      {props.textId ? <FormattedMessage id={props.textId} /> : props.text}
    </div>
  );
};

export default UnderlinedButton;
