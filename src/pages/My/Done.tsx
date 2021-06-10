import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { fetchUserQuotes } from "../../api/quote";
import { UserProps } from "../../auth/auth";
import DoneCard from "../../components/Card/DoneCard";
import { RootState } from "../../store";
import { getCstFullDatetimeString, MATCHED } from "../../utils";
import { Loading, QuoteDataProps } from "../Hospital/Containers/Request";
import "./Done.scss";

const Done = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [doneQuotes, setDoneQuotes] = useState([]);
  const user: UserProps = useSelector((state: RootState) => state.user.current);

  useEffect(() => {
    setIsLoading(true);
    const fetchMatchedQuotes = async () => {
      // TODO: get hospital Id
      const quotesData = await fetchUserQuotes({ sub: user.sub! });
      return quotesData.result.filter(
        (quote: QuoteDataProps) => quote.status === MATCHED,
      );
    };
    fetchMatchedQuotes()
      .then((quotes) => {
        // TODO: filter done quotes
        setDoneQuotes(quotes);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Done", e);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="done-container">
          {doneQuotes.length === 0 ? (
            <FormattedMessage id="done.youHaveNot" />
          ) : (
            doneQuotes.map((quote: QuoteDataProps, i) => (
              <DoneCard
                key={i}
                hid={quote.hospitalInfo.id!}
                qid={quote.quoteInfo.id}
                name={quote.hospitalInfo.name!}
                date={getCstFullDatetimeString(quote.consultTime!)}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Done;
