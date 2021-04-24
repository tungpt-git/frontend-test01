import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./store/reducers";
import App from "./App";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data.body;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
