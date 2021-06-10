// hyunsukimsokcho
// const devConfig = {
//   API_ENDPOINT:
//     "https://y4jfjy21yd.execute-api.ap-northeast-2.amazonaws.com/prod",
//   API_KEY: "IkugHXUL1b7nvcQs10owi9FpEDOEC04j21zF4yzr",
// };

// karamel
const karamelConfig = {
  COGNITO_USER_POOL_ID: "ap-northeast-2_HdEYpWeBR",
  COGNITO_CLIENT_ID: "1daf697blj6eojbjumcshi815k",
  API_ENDPOINT:
    "https://8lqfh9nd68.execute-api.ap-northeast-2.amazonaws.com/prod",
  API_KEY: "TaVV6rbQ7ruz7t4fT69g3gvS8JjCTOX9nyJRPAI4",
  S3_ACCESS_KEY: "AKIATRD75L5ZQ4XZGO2V",
  S3_SECRET_KEY: "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",
};

const localConfig = {
  ...karamelConfig,
  API_ENDPOINT: "http://localhost:3000",
  API_KEY: "",
};

const config =
  process.env.REACT_APP_ENV === "local" ? localConfig : karamelConfig;

export default config;
