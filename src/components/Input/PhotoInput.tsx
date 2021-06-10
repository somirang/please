import React from "react";
import add_photo_icon from "../../images/add-photo-icon.png";
import "./PhotoInput.scss";

interface Props {
  onPhotoUpload: React.ChangeEventHandler<HTMLInputElement>;
}

const PhotoInput = (props: Props) => {
  return (
    <div className="photo-input-container">
      <input
        type="file"
        id="postimage"
        className="photo-input"
        accept=".png, .jpg, .jpeg"
        multiple={true}
        onChange={props.onPhotoUpload}
      />
      <label htmlFor="postimage" className="photo-input-label">
        <div className="photo-input-icon-container">
          <img
            className="photo-input-img"
            src={add_photo_icon}
            alt="add-more-icon"
          />
        </div>
      </label>
    </div>
  );
};

export default PhotoInput;
