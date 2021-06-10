import React from "react";
import CommonQuoteCard from "./CommonQuoteCard";

const SentQuoteCard = (props: any) => {
  return <CommonQuoteCard mode="sent" {...props} />;
};

export default SentQuoteCard;
