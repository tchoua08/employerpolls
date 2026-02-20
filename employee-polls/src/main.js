import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { HashRouter as Router } from "react-router-dom";
import reducer from "./reducers";
import middleware from "./middleware";
import App from "./components/App";

const store = createStore(reducer, middleware);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
