import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import downArrowIcon from "../../images/down-arrow-icon.svg";
import "./DescriptionButton.scss";

interface Props {
  text: string;
  textId?: string;
  id: string;
  onClick: () => void;
  selectedIds: string[];
}

const DescriptionButton = (props: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isArrowUp, setIsArrowUp] = useState(false);

  useEffect(() => {
    const selected = props.selectedIds!.includes(props.id);
    setIsSelected(selected);
  }, [props.selectedIds, props.id]);

  return (
    <div
      className={`description-button-container ${isSelected ? "selected" : ""}`}
      onClick={props.onClick}
    >
      <div className="description-button-text">
        {props.textId ? <FormattedMessage id={props.textId} /> : props.text}
      </div>
      <img
        className={`description-button-arrow ${isArrowUp ? "rotated" : ""}`}
        src={downArrowIcon}
        alt="down-arrow"
        onClick={(e) => {
          e.stopPropagation();
          setIsArrowUp(!isArrowUp);
        }}
      />
    </div>
  );
};

export default DescriptionButton;
