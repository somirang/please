import React from "react";
import Button, { ButtonProps } from "../Button/Button";
import gray_x_icon from "../../images/gray-x-icon.svg";
import "./Modal.scss";
import { FormattedMessage } from "react-intl";

interface Props {
  openController: React.Dispatch<React.SetStateAction<boolean>>;
  header: string;
  headerId?: string;
  body: string;
  bodyId?: string;
  leftButtonProps?: ButtonProps;
  rightButtonProps?: ButtonProps;
  closableByClickOutside?: boolean;
}

const Modal = (props: Props) => {
  const onClickOutsideModalHandler = props.closableByClickOutside
    ? () => props.openController(false)
    : () => {};

  return (
    <div className="modal-container">
      <div className="modal-box-container">
        <img
          className="modal-exit-icon"
          src={gray_x_icon}
          alt="modal-x-icon"
          onClick={() => props.openController(false)}
        />
        <div className="modal-header-container">
          {props.headerId ? (
            <FormattedMessage id={props.headerId} />
          ) : (
            props.header
          )}
        </div>
        <div className="modal-body-container">
          {props.bodyId ? <FormattedMessage id={props.bodyId} /> : props.body}
        </div>
        {(props.leftButtonProps || props.rightButtonProps) && (
          <div className="modal-footer-container">
            {props.leftButtonProps && <Button {...props.leftButtonProps} />}
            {props.leftButtonProps && <div className="modal-footer-gap"></div>}
            {props.rightButtonProps && <Button {...props.rightButtonProps} />}
          </div>
        )}
      </div>
      <div className="modal-dimmer" onClick={onClickOutsideModalHandler} />
    </div>
  );
};

export default Modal;
