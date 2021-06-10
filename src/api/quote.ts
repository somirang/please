import axios from "axios";
import { headers } from ".";
import config from "../config";

interface PostQuoteParams {
  sub: string;
  quote: any;
  comment: string;
  timestamp: number;
}

export const postQuote = async (body: PostQuoteParams) => {
  let res;
  try {
    res = await axios.post(config.API_ENDPOINT + "/quote", body, headers);
  } catch (e) {
    console.log("PostQuoteError", e);
  }
  return res?.status === 204;
};

interface FetchHospitalQuotesParams {
  hid: string;
}

export const fetchHospitalQuotes = async (
  queryString: FetchHospitalQuotesParams,
) => {
  let res;
  try {
    res = await axios.get(
      config.API_ENDPOINT + `/quotes/hospital?hid=${queryString.hid}`,
      headers,
    );
  } catch (e) {
    console.log("FetchHospitalQuotesError", e);
  }
  return res?.data;
};

interface FetchUserQuotesParams {
  sub: string;
}

export const fetchUserQuotes = async (queryString: FetchUserQuotesParams) => {
  let res;
  try {
    res = await axios.get(
      config.API_ENDPOINT + `/quotes/user?sub=${queryString.sub}`,
      headers,
    );
  } catch (e) {
    console.log("FetchUserQuotesError", e);
  }
  return res?.data;
};

interface GetHospitalQuoteParams {
  hid: string;
  qid: string;
}

export const getHospitalQuote = async (queryString: GetHospitalQuoteParams) => {
  let res;
  try {
    res = await axios.get(
      config.API_ENDPOINT +
        `/quote/hospital?hid=${queryString.hid}&qid=${queryString.qid}`,
      headers,
    );
  } catch (e) {
    console.log("GetHospitalQuoteError", e);
  }
  return res?.data;
};

interface RespondQuoteParams {
  qid: string;
  hid: string;
  suggestedSurgeries: any;
  responseTime: number;
  meetLinks: string[];
}

export const respondQuote = async (body: RespondQuoteParams) => {
  let res;
  try {
    res = await axios.put(
      config.API_ENDPOINT + "/quote/respond",
      body,
      headers,
    );
  } catch (e) {
    console.log("RespondQuoteError", e);
  }
  return res?.status === 204;
};

interface MatchQuoteParams {
  qid: string;
  hid: string;
  consultTime: number;
}

export const matchQuote = async (body: MatchQuoteParams) => {
  let res;
  try {
    res = await axios.put(config.API_ENDPOINT + "/quote/match", body, headers);
  } catch (e) {
    console.log("MatchQuoteError", e);
  }
  return res?.status === 204;
};

interface RejectQuoteParams {
  qid: string;
  hid: string;
}

export const rejectQuote = async (body: RejectQuoteParams) => {
  let res;
  try {
    res = await axios.put(config.API_ENDPOINT + "/quote/reject", body, headers);
  } catch (e) {
    console.log("RejectQuoteError", e);
  }
  return res?.status === 204;
};
