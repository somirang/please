import React from "react";
import "./Navbar.scss";
import hamburger_icon from "../../images/navbar-hamburger.svg";
import karamel_logo from "../../images/karamel-logo.png";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps<any> {
  onBurgerIconClickHandler: () => void;
}

const Navbar = (props: Props) => {
  return (
    <div className="navbar-container">
      <img
        className="navbar-icon"
        src={hamburger_icon}
        onClick={props.onBurgerIconClickHandler}
        alt="navbar-icon"
      />
      <div className="navbar-title">
        <img
          className="navbar-logo"
          src={karamel_logo}
          alt="logo"
          onClick={() => props.history.push("/")}
        />
      </div>
    </div>
  );
};

export default withRouter(Navbar);
