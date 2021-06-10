import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { QuoteDataProps } from "../../pages/Hospital/Containers/Request";
import { getKstDatetime } from "../../utils";
import Button from "../Button/Button";
import "./RequestCard.scss";

interface RequestHeaderProps {
  userName: string;
  receivedTime: string;
}

export interface QuoteProps {
  categoryId: string;
  subCategoryIds: string[];
}

interface RequestBodyProps extends RouteComponentProps {
  quote: QuoteProps[];
  comment: string;
  qid?: string;
}

export const RequestHeader = (props: RequestHeaderProps) => {
  return (
    <div className="request-header-container">
      <div className="request-header-name-container">
        <div className="request-header-name-title">
          Name: <div className="request-header-name-text">{props.userName}</div>
        </div>
      </div>
      <div className="request-header-received-container">
        <div className="request-header-received-title">Received</div>
        <div className="request-header-received-text">{props.receivedTime}</div>
      </div>
    </div>
  );
};

export const RequestBody = withRouter((props: RequestBodyProps) => {
  return (
    <div className="request-body-container">
      <div className="request-body-item">
        <div className="request-body-item-title">Interested procedures</div>
        <div className="request-body-item-content">
          {props.quote.map((item, ind) => (
            <div className="request-body-item-interested-proc-row" key={ind}>
              <div className="request-body-item-interested-proc-row-title">
                Category:
                <div className="request-body-item-interested-proc-row-name">
                  {item.categoryId}
                </div>
              </div>
              <div className="request-body-item-interested-proc-row-title">
                Subcategory(s):
                <div className="request-body-item-interested-proc-row-name">
                  {item.subCategoryIds.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {props.comment && (
        <div className="request-body-item">
          <div className="request-body-item-title">Further requests</div>
          <div className="request-body-item-content">
            <div className="request-body-item-further-requests">
              {props.comment}
            </div>
          </div>
        </div>
      )}
      <div className="request-body-item">
        <div className="request-body-item-title">Uploaded pictures</div>
        <div className="request-body-item-content">
          <div className="request-body-item-uploaded-pictures">
            {/* TODO: replace with images */}
            {[...new Array(5).keys()].map((i) => (
              <div
                className="request-body-item-uploaded-pictures-img-placeholder"
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
      {props.qid && (
        <div className="request-body-item">
          <div className="request-body-button-container">
            <Button
              text="Make a quote"
              theme="primary"
              shape="square"
              onClick={() =>
                props.history.push(`/hospital/my/request/${props.qid}`)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
});

export interface RequestCardProps {
  quoteData: QuoteDataProps;
}

const RequestCard = (props: RequestCardProps) => {
  const { userInfo, quoteInfo } = props.quoteData;
  const { name: userName } = userInfo;
  const { comment, quote, timestamp, id: qid } = quoteInfo;
  return (
    <div className="request-card-container">
      <div className="request-card-header-container">
        <RequestHeader
          userName={userName}
          receivedTime={getKstDatetime(timestamp)}
        />
      </div>
      <div className="request-card-body-container">
        <RequestBody quote={quote} comment={comment} qid={qid} />
      </div>
    </div>
  );
};

export default RequestCard;
