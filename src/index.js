import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const initStore = initialState => {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    typeof window === "object" &&
    typeof window.devToolsExtension !== "undefined" &&
    process.env.NODE_ENV === "development"
      ? window.devToolsExtension()
      : f => f
  )(createStore);

  return finalCreateStore(rootReducer, initialState);
};

ReactDOM.render(
  <Provider store={initStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
