import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { fetchUserQuotes, rejectQuote } from "../../api/quote";
import { UserProps } from "../../auth/auth";
import WaitingCard from "../../components/Card/WaitingCard";
import Modal from "../../components/Modal/Modal";
import { RootState } from "../../store";
import { getCstFullDatetimeString, MATCHED } from "../../utils";
import { Loading, QuoteDataProps } from "../Hospital/Containers/Request";
import "./Waiting.scss";

const Waiting = (props: RouteComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [matchedQuotes, setMatchedQuotes] = useState([]);
  const [targetHid, setTargetHid] = useState("");
  const [targetQid, setTargetQid] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);
  const user: UserProps = useSelector((state: RootState) => state.user.current);

  const fetchMatchedQuotes = async () => {
    // TODO: get hospital Id
    const quotesData = await fetchUserQuotes({ sub: user.sub! });
    return quotesData.result.filter(
      (quote: QuoteDataProps) => quote.status === MATCHED,
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMatchedQuotes()
      .then((quotes) => {
        setMatchedQuotes(quotes);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Quotes", e);
        setIsLoading(false);
      });
  }, []);

  const onCancelHandler = (hid: string, qid: string) => {
    setTargetHid(hid);
    setTargetQid(qid);
    setShowModal(true);
  };

  const rescheduleHandler = (hid: string, qid: string) => {
    props.history.push(`/mypage/reserve/${hid}/${qid}`);
  };

  const rejectQuoteHandler = async (hid: string, qid: string) => {
    setIsRejecting(true);
    const isSuccess = await rejectQuote({ hid, qid });
    if (isSuccess) {
      setIsRejecting(false);
      setShowModal(false);
      setIsLoading(true);
      fetchMatchedQuotes()
        .then((quotes) => {
          setMatchedQuotes(quotes);
          setIsLoading(false);
        })
        .catch((e) => {
          console.error("Quotes", e);
          setIsLoading(false);
        });
    } else {
      setIsRejecting(false);
      // TODO: show error modal
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="waiting-container">
          {matchedQuotes.length === 0 ? (
            <FormattedMessage id="waiting.youHaveNot" />
          ) : (
            matchedQuotes.map((quote: QuoteDataProps, i) => (
              <WaitingCard
                key={i}
                name={quote.hospitalInfo.name!}
                hid={quote.hospitalInfo.id!}
                qid={quote.quoteInfo.id}
                date={getCstFullDatetimeString(quote.consultTime!)}
                onCancelHandler={onCancelHandler}
                videoLink={quote.meetLinks![0]}
              />
            ))
          )}
          {showModal && (
            <Modal
              openController={setShowModal}
              header="Are you sure you want to cancel?"
              headerId="cancel.msg"
              body="We might have another schedule that fit yours if you want to reschedule."
              bodyId="cancel.text"
              closableByClickOutside={true}
              leftButtonProps={{
                text: "Reschedule",
                textId: "button.reschedule",
                theme: "primary",
                shape: "square",
                style: { fontSize: "12px", fontWeight: "700", height: "40px" },
                onClick: () => rescheduleHandler(targetHid, targetQid),
              }}
              rightButtonProps={{
                text: "Yes, cancel",
                textId: "button.yesCancel",
                theme: "white",
                shape: "square",
                style: { fontSize: "12px", fontWeight: "700", height: "40px" },
                isLoading: isRejecting,
                onClick: () => rejectQuoteHandler(targetHid, targetQid),
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Waiting;
