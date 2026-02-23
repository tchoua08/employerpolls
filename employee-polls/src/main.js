import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { AuthProvider } from "./context/AuthContext.js";
import { HashRouter } from "react-router-dom";
import reducer from "./reducers";
import middleware from "./middleware";
import App from "./components/App";

const store = createStore(reducer, middleware);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
         <HashRouter>
          <App />
        </HashRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);