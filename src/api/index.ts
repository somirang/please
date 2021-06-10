import config from "../config";

export const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": config.API_KEY,
  },
};
