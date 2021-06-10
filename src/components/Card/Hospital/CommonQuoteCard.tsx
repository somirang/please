import React from "react";
import "./CommonQuoteCard.scss";
import purple_arrow_icon from "../../../images/purple-go-arrow-icon.svg";
import { getKstDate, getKstDatetime, getKstTime } from "../../../utils";
import { FormattedMessage } from "react-intl";

interface CommonQuoteCardProps {
  mode: string;
  patientName: string;
  isRead?: boolean;
  timestamp: number;
}

const CommonQuoteCard = (props: CommonQuoteCardProps) => {
  const getStatusHeader = () => {
    let header = "";
    switch (props.mode) {
      case "sent":
        header = props.isRead ? "Read" : "Sent";
        break;
      case "schedule":
        header = getKstDate(props.timestamp);
        break;
    }
    return header;
  };

  const getStatusBody = () => {
    let body = "";
    switch (props.mode) {
      case "sent":
        body = getKstDatetime(props.timestamp);
        break;
      case "schedule":
        body = getKstTime(props.timestamp) + " (KST)";
        break;
    }
    return body;
  };

  const getStatusStyle = () => {
    let style = "";
    switch (props.mode) {
      case "sent":
        style = props.isRead ? "green" : "yellow";
        break;
      case "schedule":
        style = "purple";
        break;
    }
    return style;
  };

  return (
    <div className="common-quote-card-container">
      <div className="common-quote-card-grid">
        <div className="common-quote-card-col">
          <div className="common-quote-card-patient-name-text">
            {props.patientName}
          </div>
        </div>
        <div className="common-quote-card-col">
          <div className="common-quote-card-row-item">
            <div className="common-quote-card-row-title">Eyes</div>
            <div className="common-quote-card-row-content">double eyelid</div>
          </div>
          <div className="common-quote-card-row-item">
            <div className="common-quote-card-row-title">Breast</div>
            <div className="common-quote-card-row-content">
              breast re-surgery, lifting
            </div>
          </div>
          <div className="common-quote-card-row-item">
            <div className="common-quote-card-row-title">{2} more</div>
          </div>
        </div>
        <div className="common-quote-card-col">
          <div className="common-quote-card-row-item">
            <div className="common-quote-card-row-title">Surgery A</div>
            <div className="common-quote-card-row-content">
              $ 1,200 - $ 1,400
            </div>
          </div>
          <div className="common-quote-card-row-item">
            <div className="common-quote-card-row-title">Surgery B</div>
            <div className="common-quote-card-row-content">$ 900 - $ 2,400</div>
          </div>
          <div className="common-quote-card-row-item">
            <div className="common-quote-card-row-title">{3} more</div>
          </div>
        </div>
        <div className="common-quote-card-col">
          <div className="common-quote-card-row-item">
            <div className={`common-quote-card-status ${getStatusStyle()}`}>
              <div
                className={`common-quote-card-status-header ${getStatusStyle()}`}
              >
                {getStatusHeader()}
              </div>
              <div className="common-quote-card-status-body">
                {getStatusBody()}
              </div>
            </div>
          </div>
          <div className="common-quote-card-row-item"></div>
          <div className="common-quote-card-row-item">
            <div className="common-quote-card-see-more">
              <div className="common-quote-card-see-more-text">
                <FormattedMessage id="form.case1.seeMore" />
              </div>
              <img
                className="common-quote-card-see-more-arrow-icon"
                src={purple_arrow_icon}
                alt="purple-arrow-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonQuoteCard;
