import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import config from "../config";

// const poolDataDeprecated = {
//   UserPoolId: "ap-northeast-2_AhdMlisRX",
//   ClientId: "1ht8olac0e9mtd698u49be1omo",
// };

const poolData = {
  UserPoolId: config.COGNITO_USER_POOL_ID,
  ClientId: config.COGNITO_CLIENT_ID,
};

const Pool = new CognitoUserPool(poolData);

export default Pool;

export const toUserPoolAttr = (name: string, value: string) => {
  const data = { Name: name, Value: value };
  return new CognitoUserAttribute(data);
};

export const getUser = (Username: string) => {
  const user = new CognitoUser({
    Username,
    Pool,
  });
  return user;
};
