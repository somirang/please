import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./configureStore";
import { createBrowserHistory } from "history";
import { IntlProvider } from "react-intl";

import messages_ko from "./translations/ko.json";
import messages_en from "./translations/en.json";
import messages_cn from "./translations/cn.json";

const history = createBrowserHistory();
const initialState = (window as any).initialReduxState;
const store = configureStore(initialState, history);
const language = navigator.language.split(/[-_]/)[0];

const providingLanguage: { [key: string]: string } = {
  en: "en",
  ko: "ko",
  cn: "cn",
  zh: "cn",
};

const messages: { [key: string]: any } = {
  ko: messages_ko,
  en: messages_en,
  cn: messages_cn,
  undefined: messages_en,
};

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider
      locale={language in providingLanguage ? language : "en"}
      messages={messages[providingLanguage[language]]}
    >
      <App store={store} history={history} />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
