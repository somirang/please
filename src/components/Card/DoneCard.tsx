import React from "react";
import SimpleCard, { CardProps } from "./SimpleCard";
import "./SimpleCard.scss";
import quote_icon from "../../images/quote-icon.svg";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";

interface Props extends CardProps {
  date: string; // TODO: switch to Date object?
  hid: string;
  qid: string;
}

const DoneCardContent = (props: Props) => {
  return (
    <div className="simple-card-content-container">
      <div className="simple-card-content-item">
        <div className="simple-card-sub-title">
          <FormattedMessage id="done.didConsultation" />
        </div>
        <div className="simple-card-sub-content waiting-date">{props.date}</div>
        <div className="waiting-card-footer-container">
          <div className="waiting-card-see-quote-container">
            <div
              className="waiting-card-see-quote-wrapper"
              onClick={() =>
                props.history.push(`/mypage/quotes/${props.hid}/${props.qid}`)
              }
            >
              <img
                className="waiting-card-see-quote-icon"
                src={quote_icon}
                alt="quote-icon"
              />
              <div className="waiting-card-see-quote-text">
                <FormattedMessage id="waiting.seeQuote" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoneCard = (props: Props) => {
  return (
    <SimpleCard name={props.name} profileImg={props.profileImg}>
      <DoneCardContent {...props} />
    </SimpleCard>
  );
};

export default withRouter(DoneCard);
