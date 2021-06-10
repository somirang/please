import React from "react";
import { withRouter } from "react-router";
import Button from "../Button/Button";
import "./SimpleCard.scss";
import SimpleCard, { CardProps } from "./SimpleCard";
import { FormattedMessage } from "react-intl";

interface Props extends CardProps {
  qid: string;
  hid: string;
  suggestedSurgery: string[];
  priceMin: number;
  priceMax: number;
}

const QuoteCardContent = (props: Props) => {
  return (
    <div className="simple-card-content-container">
      <div className="simple-card-content-item">
        <div className="simple-card-sub-title">
          <FormattedMessage id="quote.suggestedSurgery" />
        </div>
        <div className="simple-card-sub-content">
          {props.suggestedSurgery.join(", ")}
        </div>
      </div>
      <div className="simple-card-content-item">
        <div className="simple-card-sub-title">
          <FormattedMessage id="quote.price" />
        </div>
        <div className="simple-card-sub-content quote-price">{`$${props.priceMin.toLocaleString()} - $${props.priceMax.toLocaleString()}`}</div>
      </div>
      <div className="quote-card-consult-button-container">
        <Button
          text="Consult"
          textId="button.consult"
          theme="primary"
          shape="square"
          style={{ height: "30px", fontSize: "13px" }}
          onClick={() =>
            props.history.push(`/mypage/quotes/${props.hid}/${props.qid}`)
          }
        />
      </div>
    </div>
  );
};

const QuoteCard = (props: Props) => {
  return (
    <SimpleCard name={props.name} profileImg={props.profileImg} theme="purple">
      <QuoteCardContent {...props} />
    </SimpleCard>
  );
};

export default withRouter(QuoteCard);
