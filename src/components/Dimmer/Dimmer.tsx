import React, { useState, useEffect } from "react";
import "./Dimmer.scss";

interface Props {
  on: Boolean;
}

function Dimmer(props: Props) {
  const [zIndex, setzIndex] = useState(-1);

  useEffect(() => {
    if (!props.on) {
      setTimeout(() => {
        setzIndex(-1);
      }, 350);
    } else {
      setzIndex(100);
    }
  }, [props.on]);
  return (
    <div
      className={`dimmer-container ${props.on && "on"}`}
      style={{ zIndex }}
    />
  );
}

export default Dimmer;
