import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { getHospital } from "../../api/hospital";
import Button from "../../components/Button/Button";
import CalendarCarousel from "../../components/Input/CalendarCarousel";
import TimeMultipleSelection from "../../components/Input/TimeMultipleSelection";
import hospital_profile_default from "../../images/hospital_profile_default.svg";
import { Hospital } from "../Hospital/Containers/Preview";
import { Loading } from "../Hospital/Containers/Request";
import moment from "moment";
import "moment-timezone";
import "./Reserve.scss";
import { msOneHour } from "../../utils";
import { matchQuote } from "../../api/quote";
import { FormattedMessage } from "react-intl";

const Reserve = (props: RouteComponentProps<any>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [date, setDate] = useState("");
  const [fullDate, setFullDate] = useState("");
  const [time, setTime] = useState("");
  const [hospital, setHospital] = useState<Hospital>();

  useEffect(() => {
    setIsLoading(true);
    const initHospital = async () => {
      // TODO: get hospital ID
      const hospitalData = await getHospital({ hid: props.match.params.hid });
      const hospital = hospitalData.result;
      setHospital(hospital);
    };
    initHospital()
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Reserve", e);
        setIsLoading(false);
      });
  }, []);

  const matchQuoteHandler = async () => {
    setIsSending(true);
    const t = moment.tz(`${fullDate} ${time}`, "Asia/Seoul");
    const consultTime = t.valueOf() + msOneHour;
    const isSuccess = await matchQuote({
      hid: props.match.params.hid,
      qid: props.match.params.qid,
      consultTime,
    });
    if (isSuccess) {
      setIsSending(false);
      props.history.push("/mypage/waiting");
    } else {
      setIsSending(false);
      // TODO: show modal error
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="reserve-container">
          <div className="reserve-hospital-desc-container">
            <div className="reserve-hospital-header-container">
              <div className="reserve-hospital-profile-container">
                <img
                  className="reserve-hospital-profile-img"
                  src={hospital_profile_default}
                  alt="hospital_profile_img"
                />
              </div>
              <div className="reserve-hospital-name">{hospital?.name!}</div>
            </div>
            <div className="reserve-hospital-body-container">
              {hospital?.about!}
            </div>
          </div>
          <div className="reserve-subtitle">
            <FormattedMessage id="reserve.date" />
          </div>
          <CalendarCarousel
            date={date}
            setDate={setDate}
            setFullDate={setFullDate}
          />
          <div className="reserve-subtitle">
            <FormattedMessage id="reserve.time" />
          </div>
          <TimeMultipleSelection time={time} setTime={setTime} />
          <div className="reserve-footer-button-container">
            <Button
              text="Reserve"
              textId="button.reserve"
              shape="round"
              theme="primary"
              isLoading={isSending}
              onClick={matchQuoteHandler}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Reserve;
