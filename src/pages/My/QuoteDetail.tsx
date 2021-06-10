import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import "./QuoteDetail.scss";
import hospital_profile_default from "../../images/hospital_profile_default.svg";
import downArrowBlackIcon from "../../images/down-arrow-black-icon.svg";
import downArrowIcon from "../../images/down-arrow-icon.svg";
import { getHospitalQuote } from "../../api/quote";
import { Loading, QuoteDataProps } from "../Hospital/Containers/Request";
import { getInterestedProcsFromQuote } from "../../utils";
import Button from "../../components/Button/Button";
import { FormattedMessage } from "react-intl";

interface ProcDetailProps {
  operationTime: string;
  anesthesiaType: string;
  recoveryTime: string;
  sutureRemovalTime: string;
  warning: string;
  afterCare: string;
}

interface ProcProps extends ProcDetailProps {
  name: string;
  priceMin: number;
  priceMax: number;
  methodology: string;
}

interface ProcPropsWithInd extends ProcProps {
  nth: number;
}

interface QuoteDetailHeaderProps {
  name: string;
  hospitalProfileImg?: string;
  hospitalName: string;
  hospitalAddr: string;
  hospitalAbout: string;
  interestedProcedures: string[];
  isPreview?: boolean;
}

interface Props extends QuoteDetailHeaderProps, RouteComponentProps {
  qid: string;
  hid: string;
  recommendedProcs: ProcProps[];
}

const RecommendedProcedureItem = (props: ProcPropsWithInd) => {
  const [isArrowUp, setIsArrowUp] = useState(false);
  return (
    <div className="quote-detail-recommended-procedure-item">
      <div className="quote-detail-recommended-procedure-subtitle">
        <div className="quote-detail-recommended-procedure-subtitle-num">
          {props.nth}
        </div>
        <div className="quote-detail-recommended-procedure-subtitle-text">
          {props.name}
        </div>
      </div>
      <div className="quote-detail-recommended-procedure-sub-item purple price">
        <div className="quote-detail-recommended-procedure-sub-item-header">
          <div className="quote-detail-recommended-procedure-sub-item-title">
            <FormattedMessage id="quote.surgeryCost" />
          </div>
          <div className="quote-detail-recommended-procedure-sub-item-title-content">{`$${props.priceMin.toLocaleString()} - $${props.priceMax.toLocaleString()}`}</div>
        </div>
        <div className="quote-detail-recommended-procedure-sub-item-help-text">
          <FormattedMessage id="quote.costMayChange" />
        </div>
      </div>
      <div className="quote-detail-recommended-procedure-sub-item">
        <div className="quote-detail-recommended-procedure-sub-item-header">
          <div className="quote-detail-recommended-procedure-sub-item-title">
            <FormattedMessage id="quote.expectationOfEffect" />
          </div>
        </div>
      </div>
      <div className="quote-detail-recommended-procedure-sub-item">
        <div className="quote-detail-recommended-procedure-sub-item-header">
          <div className="quote-detail-recommended-procedure-sub-item-title">
            <FormattedMessage id="quote.operationPlan" />
          </div>
        </div>
        <div className="quote-detail-recommended-procedure-sub-item-body">
          {props.methodology}
        </div>
      </div>
      <div className="quote-detail-recommended-procedure-sub-item">
        <div
          className={`quote-detail-recommended-procedure-sub-item-header ${
            isArrowUp ? "detailed" : ""
          }`}
        >
          <div className="quote-detail-recommended-procedure-sub-item-title">
            <FormattedMessage id="quote.surgeryRelated" />
          </div>
          <img
            className={`quote-detail-recommended-procedure-related-arrow ${
              isArrowUp ? "rotated" : ""
            }`}
            src={downArrowIcon}
            alt="down-arrow"
            onClick={(e) => {
              e.stopPropagation();
              setIsArrowUp(!isArrowUp);
            }}
          />
        </div>
        {isArrowUp && (
          <div className="quote-detail-recommended-procedure-sub-item-body">
            <div className="quote-detail-recommended-procedure-sub-item-row">
              <div className="quote-detail-recommended-procedure-sub-item-row-title">
                <FormattedMessage id="quote.surgeryRelated.operationTime" />
              </div>
              <div className="quote-detail-recommended-procedure-sub-item-row-content">
                {props.operationTime}
              </div>
            </div>
            <div className="quote-detail-recommended-procedure-sub-item-row">
              <div className="quote-detail-recommended-procedure-sub-item-row-title">
                <FormattedMessage id="quote.surgeryRelated.anesthesiaMethod" />
              </div>
              <div className="quote-detail-recommended-procedure-sub-item-row-content">
                {props.anesthesiaType}
              </div>
            </div>
            <div className="quote-detail-recommended-procedure-sub-item-row">
              <div className="quote-detail-recommended-procedure-sub-item-row-title">
                <FormattedMessage id="quote.surgeryRelated.recoveryTime" />
              </div>
              <div className="quote-detail-recommended-procedure-sub-item-row-content">
                {props.recoveryTime}
              </div>
            </div>
            <div className="quote-detail-recommended-procedure-sub-item-row">
              <div className="quote-detail-recommended-procedure-sub-item-row-title">
                <FormattedMessage id="quote.surgeryRelated.seamRemovalDuration" />
              </div>
              <div className="quote-detail-recommended-procedure-sub-item-row-content">
                {props.sutureRemovalTime}
              </div>
            </div>
            <div className="quote-detail-recommended-procedure-sub-item-row paragraph">
              <div className="quote-detail-recommended-procedure-sub-item-row-title">
                <FormattedMessage id="quote.surgeryRelated.precautions" />
              </div>
              <div className="quote-detail-recommended-procedure-sub-item-row-content paragraph">
                {props.warning}
              </div>
            </div>
            <div className="quote-detail-recommended-procedure-sub-item-row paragraph">
              <div className="quote-detail-recommended-procedure-sub-item-row-title">
                <FormattedMessage id="quote.surgeryRelated.afterCare" />
              </div>
              <div className="quote-detail-recommended-procedure-sub-item-row-content paragraph">
                {props.afterCare}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const QuoteDetailHeader = (props: QuoteDetailHeaderProps) => {
  const [isMore, setIsMore] = useState(false);
  return (
    <div className="quote-detail-header-container">
      <div className="quote-detail-greetings">Dear {props.name},</div>
      <div className="quote-detail-hospital-header">
        <div className="quote-detail-hospital-profile-container">
          <img
            className="quote-detail-hospital-profile-img"
            src={
              props.hospitalProfileImg
                ? props.hospitalProfileImg
                : hospital_profile_default
            }
            alt="quote-detail-hospital-profile-img"
          />
        </div>
        <div className="quote-detail-hospital-basic-info-container">
          <div className="quote-detail-hospital-name">{props.hospitalName}</div>
          <div className="quote-detail-hospital-addr">{props.hospitalAddr}</div>
        </div>
      </div>
      <div className="quote-detail-about-hospital quote-detail-info-item">
        <div className="quote-detail-about-hospital-title quote-detail-info-subtitle">
          <FormattedMessage id="quote.aboutHospital" />
        </div>
        <div
          className={`quote-detail-about-hospital-content ${
            isMore ? "see-more" : ""
          }`}
        >
          {props.hospitalAbout}
        </div>
        <div
          className={`quote-detail-about-hospital-see-more ${
            isMore ? "see-less" : ""
          }`}
          onClick={() => setIsMore(!isMore)}
        >
          <FormattedMessage
            id={isMore ? "form.case1.seeLess" : "form.case1.seeMore"}
          />
          <img
            className={`quote-detail-about-hospital-see-more-arrow-icon ${
              isMore ? "rotated" : ""
            }`}
            src={downArrowBlackIcon}
            alt="down-arrow"
          />
        </div>
      </div>
      <div className="quote-detail-interested-procedure quote-detail-info-item">
        <div className="quote-detail-interested-procedure-title quote-detail-info-subtitle">
          <FormattedMessage id="quote.interestedProcedure" />
        </div>
        <div className="quote-detail-interested-procedure-text">
          {props.interestedProcedures.join(", ")}
        </div>
        <div
          className={`quote-detail-interested-procedure-images ${
            props.isPreview ? "small-preview" : ""
          }`}
        >
          {/* TODO: replace with images */}
          {[...new Array(5).keys()].map((i) => (
            <div
              className={`quote-detail-interested-procedure-img-placeholder ${
                props.isPreview ? "small-preview" : ""
              }`}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const QuoteDetail = withRouter((props: Props) => {
  // TODO: fetch quote with corresponding quoteId
  return (
    <div className="quote-detail-container">
      <QuoteDetailHeader {...props} />
      <div className="quote-detail-recommended-procedures-container">
        <div className="quote-detail-recommended-procedures-title">
          <FormattedMessage id="quote.procedureRecommendation" />
        </div>
        {props.recommendedProcs.map((proc, ind) => {
          const indProc = { ...proc, nth: ind + 1 };
          return <RecommendedProcedureItem key={ind} {...indProc} />;
        })}
      </div>
      <div className="quote-detail-main-button-container">
        <div className="quote-detail-main-button-wrapper">
          <Button
            text="Free consultation"
            textId="button.consultation"
            theme="primary"
            shape="square"
            style={{ fontSize: "14px" }}
            onClick={() =>
              props.history.push(`/mypage/reserve/${props.hid}/${props.qid}`)
            }
          />
        </div>
        <div className="quote-detail-main-button-wrapper">
          <Button
            text="See quote list"
            textId="button.seeQuoteList"
            theme="white"
            shape="square"
            style={{ fontSize: "14px" }}
            onClick={() => props.history.push("/mypage/quotes")}
          />
        </div>
      </div>
    </div>
  );
});

const QuoteDetailWrapper = (props: RouteComponentProps<any>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [detailedQuote, setDetailedQuote] = useState<QuoteDataProps>();

  useEffect(() => {
    setIsLoading(true);
    const fetchRequestQuotes = async () => {
      // TODO: get hospital Id
      const quoteData = await getHospitalQuote({
        hid: props.match.params.hid,
        qid: props.match.params.qid,
      });
      return quoteData.result;
    };
    fetchRequestQuotes()
      .then((quote: QuoteDataProps) => {
        console.log("AAA");
        console.log("quote", quote);
        setDetailedQuote(quote);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("BBB");
        console.error("QuoteDetail", e);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <QuoteDetail
      qid={props.match.params.qid}
      hid={props.match.params.hid}
      name={detailedQuote?.userInfo.name!}
      hospitalName={detailedQuote?.hospitalInfo.name!}
      hospitalAddr={detailedQuote?.hospitalInfo.addr!}
      hospitalAbout={detailedQuote?.hospitalInfo.about!}
      interestedProcedures={getInterestedProcsFromQuote(
        detailedQuote?.quoteInfo.quote!,
      )}
      recommendedProcs={detailedQuote?.suggestedSurgeries}
    />
  );
};

export default QuoteDetailWrapper;
