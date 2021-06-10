import axios from "axios";
import { headers } from ".";
import config from "../config";

interface PostUserParams {
  sub: string;
  phone: string;
  name: string;
  email: string;
}

export const postUser = async (body: PostUserParams) => {
  let res;
  try {
    res = await axios.post(config.API_ENDPOINT + "/user", body, headers);
  } catch (e) {
    console.error("PostUserError", e);
  }
  return res?.status === 204;
};

export interface GetUserParams {
  sub: string;
}

export const getUser = async (queryString: GetUserParams) => {
  let res;
  try {
    res = await axios.get(
      config.API_ENDPOINT + `/user?sub=${queryString.sub}`,
      headers,
    );
  } catch (e) {
    console.error("GetUserError", e);
  }
  return res?.data;
};
