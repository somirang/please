import React, { useEffect, useState } from "react";
import { fetchHospitalQuotes } from "../../../api/quote";
import SentQuoteCard from "../../../components/Card/Hospital/SentQuoteCard";
import { RESPONDED } from "../../../utils";
import "./CardListView.scss";
import { EmptyDesc, Loading, QuoteDataProps } from "./Request";

interface LegendProps {
  mode: string;
}

export const Legend = (props: LegendProps) => {
  const itemList = [
    "Patient name",
    "Interested procedures",
    "Recommendation",
    props.mode === "sent" ? "Status" : "Time",
  ];
  return (
    <div className="legend-container">
      {itemList.map((item, ind) => (
        <div className="legend-item" key={ind}>
          {item}
        </div>
      ))}
    </div>
  );
};

const Sent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sentQuotes, setSentQuotes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchRequestQuotes = async () => {
      // TODO: get hospital Id
      const quotesData = await fetchHospitalQuotes({ hid: "h1" });
      return quotesData.result.filter(
        (quote: QuoteDataProps) => quote.status === RESPONDED,
      );
    };
    fetchRequestQuotes()
      .then((quotes) => {
        setSentQuotes(quotes);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Sent", e);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="hospital-card-list-container">
          <div className="hospital-card-list">
            <Legend mode="sent" />
            {sentQuotes.length === 0 ? (
              <EmptyDesc message="You haven’t sent any quotes yet." />
            ) : (
              sentQuotes.map((quote: QuoteDataProps, i) => (
                <div className="hospital-card-list-item" key={i}>
                  <SentQuoteCard
                    patientName={quote.userInfo.name}
                    isRead={quote.isRead}
                    timestamp={quote.responseTime}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sent;
