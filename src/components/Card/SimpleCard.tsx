import React from "react";
import "./SimpleCard.scss";
import hospital_profile_default from "../../images/hospital_profile_default.svg";
import { RouteComponentProps, withRouter } from "react-router";

export interface CardProps extends RouteComponentProps {
  theme?: string;
  profileImg?: string;
  name: string;
  children?: JSX.Element;
}

const SimpleCard = (props: CardProps) => {
  return (
    <div className={`simple-card-container ${props.theme}`}>
      <div className="simple-card-header-container">
        <div className="simple-card-profile-container">
          <img
            className="simple-card-profile-img"
            src={props.profileImg ? props.profileImg : hospital_profile_default}
            alt="hospital_profile_img"
          />
        </div>
        <div className="simple-card-name-container">{props.name}</div>
      </div>
      <div className="simple-card-body-container">{props.children}</div>
    </div>
  );
};

export default withRouter(SimpleCard);
