import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { fetchUserQuotes } from "../../api/quote";
import { UserProps } from "../../auth/auth";
import QuoteCard from "../../components/Card/QuoteCard";
import { RootState } from "../../store";
import { RESPONDED } from "../../utils";
import { Loading, QuoteDataProps } from "../Hospital/Containers/Request";
import "./Quotes.scss";

const Quotes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const user: UserProps = useSelector((state: RootState) => state.user.current);

  useEffect(() => {
    setIsLoading(true);
    const fetchQuotes = async () => {
      // TODO: get hospital Id
      const quotesData = await fetchUserQuotes({ sub: user.sub! });
      return quotesData.result.filter(
        (quote: QuoteDataProps) => quote.status === RESPONDED,
      );
    };
    fetchQuotes()
      .then((quotes) => {
        setQuotes(quotes);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Quotes", e);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="quotes-container">
          <>
            {quotes.length === 0 ? (
              <FormattedMessage id="quote.youHaveNot" />
            ) : (
              <>
                <div className="quotes-timestamp-container">Received today</div>
                {quotes.map((quote: QuoteDataProps, i) => (
                  <QuoteCard
                    key={i}
                    qid={quote.quoteInfo.id}
                    hid={quote.hospitalInfo.id!}
                    name={quote.hospitalInfo.name!}
                    priceMin={800}
                    priceMax={1200}
                    suggestedSurgery={quote.suggestedSurgeries.map(
                      (s: any) => s.name,
                    )}
                  />
                ))}
              </>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default Quotes;
