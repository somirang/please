import React, { useEffect, useState } from "react";
import { fetchHospitalQuotes } from "../../../api/quote";
import ScheduleQuoteCard from "../../../components/Card/Hospital/ScheduleQuoteCard";
import { MATCHED } from "../../../utils";
import "./CardListView.scss";
import { Loading, QuoteDataProps } from "./Request";
import { Legend } from "./Sent";

const Schedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduledQuotes, setScheduledQuotes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchRequestQuotes = async () => {
      // TODO: get hospital Id
      const quotesData = await fetchHospitalQuotes({ hid: "h1" });
      return quotesData.result.filter(
        (quote: QuoteDataProps) => quote.status === MATCHED,
      );
    };
    fetchRequestQuotes()
      .then((quotes) => {
        setScheduledQuotes(quotes);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Schedule", e);
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
            <Legend mode="schedule" />
            {scheduledQuotes.map((quote: QuoteDataProps, i) => (
              <div className="hospital-card-list-item" key={i}>
                <ScheduleQuoteCard
                  patientName={quote.userInfo.name}
                  timestamp={quote.consultTime}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Schedule;
