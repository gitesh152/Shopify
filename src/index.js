import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; //Importing Bootstrap
import "../node_modules/font-awesome/css/font-awesome.min.css"; //Importing FontAwesome Icons
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import store from "./redux/store";
ReactDOM.render(
  <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ToastProvider>,
  document.getElementById("root")
);
