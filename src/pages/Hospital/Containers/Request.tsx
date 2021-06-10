import React, { useEffect, useState } from "react";
import { fetchHospitalQuotes } from "../../../api/quote";
import RequestCard, { QuoteProps } from "../../../components/Card/RequestCard";
import { PENDING } from "../../../utils";
import { Hospital } from "./Preview";
import "./Request.scss";
import { FormattedMessage } from "react-intl";

interface UserInfoProps {
  name: string;
}

interface QuoteInfoProps {
  quote: QuoteProps[];
  comment: string;
  timestamp: number;
  id: string;
}

export interface QuoteDataProps {
  status: string;
  userInfo: UserInfoProps;
  quoteInfo: QuoteInfoProps;
  hospitalInfo: Hospital;
  isRead?: boolean;
  responseTime?: number;
  consultTime?: number;
  suggestedSurgeries?: any;
  meetLinks?: string[];
}

interface LoadingProps {
  containerType?: string;
}

export const Loading = (props: LoadingProps) => (
  <div
    className={`hospital-loading-container ${
      props.containerType ? props.containerType : "loading-container"
    }`}
  >
    Loading..
  </div>
);

interface DescProps {
  message: string;
  messageId?: string;
}

export const EmptyDesc = (props: DescProps) => (
  <div className="hospital-mypage-no-request-text">
    {props.messageId ? (
      <FormattedMessage id={props.messageId} />
    ) : (
      props.message
    )}
  </div>
);

const Request = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requestQuotes, setRequestQuotes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchRequestQuotes = async () => {
      // TODO: get hospital Id
      const quotesData = await fetchHospitalQuotes({ hid: "h1" });
      return quotesData.result.filter(
        (quote: QuoteDataProps) => quote.status === PENDING,
      );
    };
    fetchRequestQuotes()
      .then((quotes) => {
        setRequestQuotes(quotes);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Request", e);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : requestQuotes.length === 0 ? (
        <EmptyDesc
          message="You haven’t received any quotes yet."
          messageId="quote.youHaveNot"
        />
      ) : (
        <div className="hospital-mypage-request-container">
          {requestQuotes.map((quote, ind) => {
            return <RequestCard key={ind} quoteData={quote} />;
          })}
        </div>
      )}
    </>
  );
};

export default Request;
