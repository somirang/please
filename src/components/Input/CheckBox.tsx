import React from "react";
import "./CheckBox.scss";

interface Props {
  value: boolean;
  onChange: () => void;
}

const CheckBox = (props: Props) => {
  return (
    <div
      className={`check-box-container ${props.value ? "selected" : ""}`}
      onClick={props.onChange}
    >
      {props.value && <div className="check-box-inner-square" />}
    </div>
  );
};

export default CheckBox;
