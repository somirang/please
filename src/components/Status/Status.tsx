import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import airPlaneIcon from "../../images/airplane-icon.svg";

import "./Status.scss";

interface Props {
  step: number;
  subStep: number;
  maxSubStep: number;
  isSignedIn: boolean;
}

const Status = (props: Props) => {
  const percentage = Math.min(
    Math.floor(
      ((props.step + props.subStep) /
        (props.maxSubStep + 3 + (props.isSignedIn ? -1 : 0))) *
        100,
    ),
    100,
  );
  return (
    <div className="status-container">
      {props.step !== 5 ? (
        <>
          <div className="status-percentage-text">{percentage}%</div>
          <ProgressBar
            className="status-progress-bar"
            completed={Math.floor(percentage)}
            height="5px"
            borderRadius="2.5px"
            isLabelVisible={false}
            baseBgColor="#f2f2f2"
            bgColor="#8646F1"
          />
        </>
      ) : (
        <div className="status-done-airplane-icon-container">
          <img
            className="status-done-airplane-icon"
            src={airPlaneIcon}
            alt="airplane-icon"
          />
        </div>
      )}
    </div>
  );
};

export default Status;
