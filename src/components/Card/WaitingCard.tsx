import React from "react";
import { withRouter } from "react-router";
import Button from "../Button/Button";
import SimpleCard, { CardProps } from "./SimpleCard";
import "./SimpleCard.scss";
import quote_icon from "../../images/quote-icon.svg";
import { FormattedMessage } from "react-intl";

interface Props extends CardProps {
  date: string; // TODO: switch to Date object?
  hid: string;
  qid: string;
  videoLink: string;
  onCancelHandler: (hid: string, qid: string) => void;
}

const WaitingCardContent = (props: Props) => {
  return (
    <div className="simple-card-content-container">
      <div className="simple-card-content-item">
        <div className="simple-card-sub-title">
          <FormattedMessage id="waiting.appointment" />
        </div>
        <div className="simple-card-sub-content waiting-date">{props.date}</div>
      </div>
      <div className="simple-card-content-item">
        <div className="simple-card-sub-title">
          <FormattedMessage id="waiting.videoLink" />
        </div>
        <div className="simple-card-sub-content waiting-meet-link">
          {props.videoLink}
        </div>
      </div>
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
        <div className="waiting-card-footer-button-container">
          <Button
            text="Reschedule"
            textId="button.reschedule"
            shape="square"
            theme="white"
            style={{ height: "30px", fontSize: "13px" }}
            onClick={() =>
              props.history.push(`/mypage/reserve/${props.hid}/${props.qid}`)
            }
          />
          <Button
            text="Cancel"
            textId="button.cancel"
            shape="square"
            theme="white"
            style={{ height: "30px", fontSize: "13px" }}
            onClick={() => props.onCancelHandler(props.hid, props.qid)}
          />
        </div>
      </div>
    </div>
  );
};

const WaitingCard = (props: Props) => {
  return (
    <SimpleCard name={props.name} profileImg={props.profileImg}>
      <WaitingCardContent {...props} />
    </SimpleCard>
  );
};

export default withRouter(WaitingCard);
