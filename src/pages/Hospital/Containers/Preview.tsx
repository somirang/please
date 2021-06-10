import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { getHospitalQuote, respondQuote } from "../../../api/quote";
import Button from "../../../components/Button/Button";
import {
  RequestBody,
  RequestHeader,
} from "../../../components/Card/RequestCard";
import InfoInput from "../../../components/Input/InfoInput";
import ProcInput from "../../../components/Input/ProcInput";
import purple_go_back_arrow_icon from "../../../images/purple-go-back-arrow-icon.svg";
import { QuoteDetailHeader } from "../../My/QuoteDetail";
import { EmptyDesc, Loading, QuoteDataProps } from "./Request";
import "./Preview.scss";
import { getInterestedProcsFromQuote, getKstDatetime } from "../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FormattedMessage } from "react-intl";

export interface Procedure {
  name: string;
  priceMin?: string;
  priceMax?: string;
  methodology?: string;
  operationTime?: string;
  anesthesiaType?: string;
  recoveryTime?: string;
  sutureRemovalTime?: string;
  warning?: string;
  afterCare?: string;
}

export interface Hospital {
  id?: string;
  name?: string;
  addr?: string;
  about?: string;
  procs?: string[];
}

const initProc: Procedure = { name: "" };

const Preview = (props: RouteComponentProps<any>) => {
  const [recommendedProcs, setRecommendedProcs] = useState<Procedure[]>([
    initProc,
  ]);
  const [videoConfLinks, setVideoConfLinks] = useState<string[]>(["", "", ""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [previewQuote, setPreviewQuote] = useState<QuoteDataProps>();
  const hospital: Hospital = useSelector(
    (state: RootState) => state.hospital.current,
  );

  const updateNthLink = (nth: number, newLink: string) => {
    const newLinks = [...videoConfLinks];
    newLinks[nth] = newLink;
    setVideoConfLinks(newLinks);
  };

  const updateWrapper = (nth: number) => (key: string, val: any) => {
    const newProcs = [...recommendedProcs];
    const newProc: { [key: string]: any; name: string } = { ...newProcs[nth] };
    newProc[key] = val;
    newProcs[nth] = newProc;
    setRecommendedProcs(newProcs);
  };

  const addMoreProc = () => {
    const newProcs = [...recommendedProcs];
    newProcs.push(initProc);
    setRecommendedProcs(newProcs);
  };

  const deleteNthProc = (nth: number) => () => {
    const newProcs = [...recommendedProcs];
    newProcs.splice(nth, 1);
    setRecommendedProcs(newProcs);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchRequestQuotes = async () => {
      // TODO: get hospital Id
      const quoteData = await getHospitalQuote({
        hid: "h1",
        qid: props.match.params.quoteId,
      });
      return quoteData.result;
    };
    fetchRequestQuotes()
      .then((quote: QuoteDataProps) => {
        setPreviewQuote(quote);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Preview", e);
        setIsLoading(false);
      });
  }, []);

  const sendQuoteResponse = async () => {
    setIsSending(true);
    const isResponseSuccess = await respondQuote({
      hid: "h1",
      qid: props.match.params.quoteId,
      meetLinks: videoConfLinks,
      suggestedSurgeries: recommendedProcs,
      responseTime: new Date().getTime(),
    });
    if (isResponseSuccess) {
      setIsSending(false);
      props.history.push("/hospital/my/sent");
    } else {
      setIsSending(false);
      // TODO: setShowErrorModal(true);
    }
  };

  const isResponseFilled = () => {
    const isVideoConfLinksFilled = videoConfLinks.every((link) => link !== "");
    return isVideoConfLinksFilled;
  };

  return (
    <>
      {isLoading ? (
        <Loading containerType="preview" />
      ) : !previewQuote ? (
        <EmptyDesc message="No quote found" />
      ) : (
        <div className="hospital-mypage-preview-background-container">
          <div className="hospital-mypage-preview-container">
            <div className="hospital-mypage-go-back">
              <div
                className="hospital-mypage-go-back-box"
                onClick={() => props.history.push("/hospital/my")}
              >
                <img
                  className="hospital-mypage-go-back-icon"
                  src={purple_go_back_arrow_icon}
                  alt="mypage-go-back-icon"
                />
                <FormattedMessage id="myPage" />
              </div>
            </div>
            <div className="hospital-mypage-sub-container-collection">
              <div className="hospital-mypage-sub-container">
                <div className="hospital-mypage-sub-container-title">
                  Request
                </div>
                <div className="hospital-mypage-sub-container-item">
                  <RequestHeader
                    userName={previewQuote.userInfo.name}
                    receivedTime={getKstDatetime(
                      previewQuote.quoteInfo.timestamp,
                    )}
                  />
                </div>
                <RequestBody
                  quote={previewQuote.quoteInfo.quote}
                  comment={previewQuote.quoteInfo.comment}
                />
              </div>
              <div className="hospital-mypage-sub-container">
                <div className="hospital-mypage-sub-container-title">
                  <FormattedMessage id="quote.yourQuotes" />
                </div>
                <div className="hospital-mypage-sub-container-description">
                  <FormattedMessage id="quote.previewOfYourQuotes" />
                </div>
                <div className="hospital-mypage-quote-preview-container">
                  <QuoteDetailHeader
                    name={previewQuote.userInfo.name}
                    hospitalName={hospital.name!}
                    hospitalAddr={hospital.addr!}
                    hospitalAbout={hospital.about!}
                    interestedProcedures={getInterestedProcsFromQuote(
                      previewQuote.quoteInfo.quote,
                    )}
                    isPreview={true}
                  />
                  <div className="hospital-mypage-quote-preview-proc-recommend-container">
                    <div className="hospital-mypage-quote-preview-proc-recommend-title">
                      <FormattedMessage id="quote.procedureRecommendation" />
                    </div>
                    <div className="hospital-mypage-quote-preview-proc-recommend-input-collection">
                      {recommendedProcs.map((proc, ind) => (
                        <div
                          key={ind}
                          className="hospital-mypage-quote-preview-proc-recommend-input-container"
                        >
                          <ProcInput
                            {...proc}
                            update={updateWrapper(ind)}
                            deletable={ind !== 0}
                            deleteHandler={deleteNthProc(ind)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="hospital-mypage-quote-preview-proc-recommend-more-container">
                      <div
                        className="hospital-mypage-quote-preview-proc-recommend-more-text"
                        onClick={addMoreProc}
                      >
                        <div className="hospital-mypage-quote-preview-proc-recommend-more-plus">
                          +
                        </div>{" "}
                        <FormattedMessage id="quote.addMoreProcedure" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hospital-mypage-sub-container">
                <div className="hospital-mypage-sub-container-title">
                  <FormattedMessage id="quote.videoConferenceLink" />
                </div>
                <div className="hospital-mypage-sub-container-description">
                  <FormattedMessage id="quote.videoConferencePut" />
                </div>
                <div className="hospital-mypage-video-conf-link-input-collection">
                  {videoConfLinks.map((link, ind) => (
                    <InfoInput
                      key={ind}
                      title={`Day ${(ind + 1).toString()}`}
                      value={link}
                      onChange={(e) => updateNthLink(ind, e.target.value)}
                    />
                  ))}
                </div>
                <div className="hospital-mypage-send-quote-button-container">
                  <Button
                    text="Send quote"
                    shape="round"
                    theme="primary"
                    onClick={sendQuoteResponse}
                    isDisabled={!isResponseFilled()}
                    isLoading={isSending}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preview;
