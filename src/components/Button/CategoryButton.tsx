import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import "./CategoryButton.scss";

interface Props {
  text: string;
  textId?: string;
  id: string;
  onClick: () => void;
  selectedIds: string[];
  selected?: boolean;
  image: string;
}

const CategoryButton = (props: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const selected = props.selectedIds!.includes(props.id);
    setIsSelected(selected);
  }, [props.selectedIds, props.id]);

  return (
    <div
      className={`category-button-container ${isSelected && "selected"}`}
      onClick={props.onClick}
    >
      <div className="category-button-icon-container">
        <img src={props.image} alt="category-icon" />
      </div>
      <div className="category-button-text">
        {props.textId ? <FormattedMessage id={props.textId} /> : props.text}
      </div>
    </div>
  );
};

export default CategoryButton;
