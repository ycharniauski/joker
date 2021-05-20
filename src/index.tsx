import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import { store } from "store/store";
import App from "components/App";
import createBackendProvider from "providers/backendProvider/createBackendProvider";
import injector from "utils/injector";

import "./assets/base.scss";

injector.registerBackendProvider(createBackendProvider());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
