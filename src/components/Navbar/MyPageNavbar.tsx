import React from "react";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router";
import "./MyPageNavbar.scss";

interface Props extends RouteComponentProps {
  currView: string;
}

const MyPageNavbar = (props: Props) => {
  const navbarItems = ["Quotes", "Reserve", "Waiting", "Done"];
  const navbarIds = [
    "myPage.quote",
    "myPage.reserve",
    "myPage.waiting",
    "myPage.done",
  ];
  return (
    <div className="my-page-navbar-container">
      {navbarItems.map((item, ind) => (
        <div
          className="my-page-navbar-item"
          key={item}
          onClick={() => props.history.push(`/mypage/${item.toLowerCase()}`)}
        >
          <div
            className={`my-page-navbar-number ${
              item.toLowerCase() === props.currView ? "selected" : ""
            }`}
          >
            <div
              className={`my-page-navbar-number-text ${
                item.toLowerCase() === props.currView ? "selected" : ""
              }`}
            >
              {ind + 1}
            </div>
          </div>
          <div
            className={`my-page-navbar-item-text ${
              item.toLowerCase() === props.currView ? "selected" : ""
            }`}
          >
            <FormattedMessage id={navbarIds[ind]} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default withRouter(MyPageNavbar);
