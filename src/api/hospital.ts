import axios from "axios";
import { headers } from ".";
import config from "../config";

interface GetHospitalParams {
  hid: string;
}

export const getHospital = async (queryString: GetHospitalParams) => {
  let res;
  try {
    res = await axios.get(
      config.API_ENDPOINT + `/hospital?hid=${queryString.hid}`,
      headers,
    );
  } catch (e) {
    console.log("GetHospitalError", e);
  }
  return res?.data;
};
