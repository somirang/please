import React from "react";
import "./PhotoPreview.scss";
import x_icon from "../../images/cancel-icon.png";
import EXAMPLE from "../../images/x-icon.svg";

interface Props {
  src: any;
  photoInd: number;
  deleteNthPhoto: any;
}

const PhotoPreview = (props: Props) => {
  return (
    <div className="photo-preview-container">
      <div className="photo-preview-x-button-container">
        <div
          className="photo-preview-x-button"
          onClick={() => props.deleteNthPhoto(props.photoInd)}
        >
          <img className="photo-preview-x-img" src={x_icon} alt="preview-x" />
        </div>
      </div>
      <img
        className="photo-img"
        src={props.src ? props.src : EXAMPLE}
        alt="uploaded"
      />
    </div>
  );
};

export default PhotoPreview;
