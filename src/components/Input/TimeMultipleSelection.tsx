import React from "react";
import "./TimeMultipleSelection.scss";

interface Time {
  value: string;
  available: boolean;
}

interface TimeSelectionProps {
  time: Time;
  isSelected: boolean;
  disabled: boolean;
  onClickHandler: (time: Time) => void;
}

const TimeSelectionItem = (props: TimeSelectionProps) => {
  return (
    <div
      className={`time-multiple-selection-item ${
        props.isSelected ? "selected" : ""
      } ${props.disabled ? "disabled" : ""}`}
      onClick={() => props.onClickHandler(props.time)}
    >
      {props.time.value}
    </div>
  );
};

interface TimeProps {
  time: string;
  setTime: (t: string) => void;
}

const TimeMultipleSelection = (props: TimeProps) => {
  // const [selectedTimeList, setSelectedTimeList] = useState<string[]>([]);
  const timeList = [
    { value: "11:00", available: true },
    { value: "12:00", available: true },
    { value: "14:00", available: false },
    { value: "15:00", available: true },
    { value: "16:00", available: false },
    { value: "17:00", available: true },
    { value: "18:00", available: true },
    { value: "19:00", available: true },
  ];

  // const onTimeItemClick = (time: Time) => {
  //   if (time.available) {
  //     setSelectedTimeList((tl) => {
  //       const newTl = [...tl];
  //       const tInd = tl.indexOf(time.value);
  //       if (tInd > -1) {
  //         newTl.splice(tInd, 1);
  //       } else {
  //         newTl.push(time.value);
  //       }
  //       return newTl;
  //     });
  //   }
  // };

  const onTimeItemClick = (time: Time) => {
    if (time.available) {
      props.setTime(time.value);
    }
  };

  return (
    <div className="time-multiple-selection-container">
      {timeList.map((time) => (
        <TimeSelectionItem
          time={time}
          key={time.value}
          isSelected={props.time === time.value}
          disabled={!time.available}
          onClickHandler={onTimeItemClick}
        />
      ))}
    </div>
  );
};

export default TimeMultipleSelection;
