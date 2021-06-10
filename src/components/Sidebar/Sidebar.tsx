import React, { useEffect, useRef, useState } from "react";
import Dimmer from "../Dimmer/Dimmer";
import "./Sidebar.scss";
import sidebar_x_icon from "../../images/sidebar-x.svg";
import sidebar_home_icon from "../../images/sidebar-home-icon.svg";
import karamel_logo from "../../images/karamel-logo.png";
import { useAuthContext, UserProps } from "../../auth/auth";
import { RouteComponentProps, withRouter } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUser } from "../../api/user";
import { FormattedMessage } from "react-intl";

interface Props extends RouteComponentProps<any> {
  isSidebarOpened: Boolean;
  sidebarCloseCallback: () => void;
}

const Sidebar = (props: Props) => {
  const auth = useAuthContext();
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState("");
  const user: UserProps = useSelector((state: RootState) => state.user.current);

  const onClickOutsideSidebarHandler = (e: MouseEvent) => {
    if (
      props.isSidebarOpened &&
      !sideBarRef.current?.contains(e.target as Node)
    ) {
      props.sidebarCloseCallback();
    }
  };

  const signOutHandler = () => {
    auth?.logout();
    props.sidebarCloseCallback();
    props.history.push("/landing");
  };

  const goSignIn = () => {
    props.sidebarCloseCallback();
    props.history.push("/signin");
  };

  const goMypage = () => {
    props.sidebarCloseCallback();
    props.history.push("/mypage");
  };

  const goForm = () => {
    props.sidebarCloseCallback();
    props.history.push("/form");
  };

  const goHospitalSignIn = () => {
    props.sidebarCloseCallback();
    props.history.push("/hospital/signin");
  };

  useEffect(() => {
    const getUserName = async () => {
      const { sub } = user;
      if (sub) {
        const res = await getUser({ sub });
        return res.result.name;
      }
    };
    const isAuthValid = Object.keys(user).length !== 0;
    setIsAuthenticated(isAuthValid);
    if (isAuthValid) {
      getUserName().then((name) => setUserName(name));
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener("click", onClickOutsideSidebarHandler);
    return () =>
      window.removeEventListener("click", onClickOutsideSidebarHandler);
  });

  return (
    <div className="sidebar-container">
      <div
        className={`sidebar-content ${props.isSidebarOpened && "show"}`}
        ref={sideBarRef}
      >
        <div
          className={`sidebar-exit-icon-box ${props.isSidebarOpened && "show"}`}
        >
          <div className="sidebar-title">
            <img className="sidebar-logo" src={karamel_logo} alt="logo" />
          </div>
          <img
            className="sidebar-exit-icon"
            src={sidebar_x_icon}
            onClick={props.sidebarCloseCallback}
            alt={"sidebar-exit-icon"}
          />
          {isAuthenticated && (
            <div className="sidebar-greetings">
              <FormattedMessage
                id="navbar.greeting"
                values={{ name: userName }}
              />
            </div>
          )}
        </div>
        <div
          className={`sidebar-menu-title-item ${
            props.isSidebarOpened && "show"
          }`}
        >
          <div className="sidebar-menu-title-content">
            <img
              className="sidebar-menu-title-home-icon"
              src={sidebar_home_icon}
              alt="sidebar-home-icon"
            />
            <FormattedMessage id="navbar.user" />
          </div>
        </div>
        {!isAuthenticated && (
          <div
            className={`sidebar-menu-item ${props.isSidebarOpened && "show"}`}
            onClick={goSignIn}
          >
            <FormattedMessage id="navbar.login" />
          </div>
        )}
        {isAuthenticated && (
          <div
            className={`sidebar-menu-item ${props.isSidebarOpened && "show"}`}
            onClick={goMypage}
          >
            <FormattedMessage id="navbar.myPage" />
          </div>
        )}
        <div
          className={`sidebar-menu-item ${props.isSidebarOpened && "show"}`}
          onClick={goForm}
        >
          <FormattedMessage id="navbar.findHospitals" />
        </div>
        {/* <div className={`sidebar-menu-item ${props.isSidebarOpened && "show"}`}>
          Why Karamel?
        </div> */}
        {isAuthenticated && (
          <div
            className={`sidebar-menu-item ${props.isSidebarOpened && "show"}`}
            onClick={signOutHandler}
          >
            <FormattedMessage id="navbar.logout" />
          </div>
        )}
        <div
          className={`sidebar-menu-title-item ${
            props.isSidebarOpened && "show"
          }`}
        >
          <div className="sidebar-menu-title-content">
            <img
              className="sidebar-menu-title-home-icon"
              src={sidebar_home_icon}
              alt="sidebar-home-icon"
            />
            <FormattedMessage id="navbar.hospital" />
          </div>
        </div>
        <div
          className={`sidebar-menu-item ${props.isSidebarOpened && "show"}`}
          onClick={goHospitalSignIn}
        >
          <FormattedMessage id="navbar.login" />
        </div>
        {/* <div className={`sidebar-menu-item ${props.isSidebarOpened && "show"}`}>
          Partner benefits
        </div> */}
      </div>
      <Dimmer on={props.isSidebarOpened} />
    </div>
  );
};

export default withRouter(Sidebar);
