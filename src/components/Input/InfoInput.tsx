import React from "react";
import Button from "../Button/Button";
import checkIcon from "../../images/check-icon.svg";
import "./InfoInput.scss";
import { FormattedMessage } from "react-intl";

export interface InfoInputProps {
  type?: string;
  title?: string;
  titleId?: string;
  value: string;
  width?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  buttonText?: string;
  buttonTextId?: string;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
  buttonLoading?: boolean;
  showConfirmed?: boolean;
  optionVals?: string[];
  optionKeys?: string[];
  onSelectChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const InfoInput = (props: InfoInputProps) => {
  return (
    <div
      className={`info-input-container ${
        props.title || props.titleId ? "" : "plain"
      }`}
    >
      {(props.title || props.titleId) && (
        <div className="info-input-title">
          {props.titleId ? (
            <FormattedMessage id={props.titleId} />
          ) : (
            props.title
          )}
        </div>
      )}
      <div className="info-input-content">
        {props.optionVals && props.optionKeys && (
          <select
            className="info-input-dropdown"
            onChange={props.onSelectChange}
          >
            {props.optionVals.map((opt, ind) => (
              <option key={opt} value={opt}>
                {props.optionKeys![ind]}
              </option>
            ))}
          </select>
        )}
        <input
          className="info-input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
          style={{ width: props.width }}
        />
        {props.onButtonClick && (props.buttonText || props.buttonTextId) && (
          <div className="info-input-submit-button-container">
            <Button
              text={props.buttonText!}
              textId={props.buttonTextId}
              theme="primary"
              shape="square"
              size="small"
              isDisabled={props.buttonDisabled}
              style={{ width: "64px" }}
              onClick={props.onButtonClick}
              isLoading={props.buttonLoading}
            />
          </div>
        )}
        {props.showConfirmed && (
          <div className="info-input-green-check-circle">
            <img
              className="info-input-green-check"
              src={checkIcon}
              alt="check-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoInput;
