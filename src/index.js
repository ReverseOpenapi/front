import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./mcd/store/store";

import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://5f8858df2a2f487fa3c762462ea43700@o564090.ingest.sentry.io/6253192',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.2,
    environment: 'front@prod',
  })
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
