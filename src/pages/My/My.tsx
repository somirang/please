import React from "react";
import "./My.scss";
import my_page_home_icon from "../../images/sidebar-home-icon.svg";
import purple_go_back_arrow_icon from "../../images/purple-go-back-arrow-icon.svg";
import MyPageNavbar from "../../components/Navbar/MyPageNavbar";
import { Route, RouteComponentProps, Switch, useLocation } from "react-router";
import { NotFoundPage } from "../User";
import Quotes from "./Quotes";
import Reserve from "./Reserve";
import Done from "./Done";
import Waiting from "./Waiting";
import QuoteDetailWrapper from "./QuoteDetail";
import { FormattedMessage } from "react-intl";

const My = (props: RouteComponentProps) => {
  const location = useLocation();

  const splitLoc = () => location.pathname.split("/");

  const getCurrentView = () => {
    const splitted = splitLoc();
    if (splitted.length < 3 || splitted[2] === "") {
      return "quotes";
    }
    return splitted[2];
  };

  const isDetailedView = () => {
    const splitted = splitLoc();
    return splitted.length === 5 && splitted[2] === "quotes";
  };

  return (
    <div className="my-page-container">
      <div className={`my-page-title ${isDetailedView() ? "thin" : ""}`}>
        <div
          className="my-page-title-box"
          onClick={
            isDetailedView() ? () => props.history.push("/mypage") : () => {}
          }
        >
          <img
            className="my-page-title-home-icon"
            src={
              isDetailedView() ? purple_go_back_arrow_icon : my_page_home_icon
            }
            alt="mypage-home-icon"
          />
          <FormattedMessage id="myPage" />
        </div>
      </div>
      {!isDetailedView() && (
        <div className="my-page-navbar-wrapper">
          <MyPageNavbar currView={getCurrentView()} />
        </div>
      )}
      <Switch>
        <Route exact path={props.match.path} component={Quotes} />
        <Route exact path={`${props.match.path}/quotes`} component={Quotes} />
        <Route
          path={`${props.match.path}/quotes/:hid/:qid`}
          component={QuoteDetailWrapper}
        />
        <Route
          path={`${props.match.path}/reserve/:hid/:qid`}
          component={Reserve}
        />
        <Route exact path={`${props.match.path}/waiting`} component={Waiting} />
        <Route exact path={`${props.match.path}/done`} component={Done} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default My;
