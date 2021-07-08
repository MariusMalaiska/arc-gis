import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app/App";
// import { FetchProvider } from "./providers/fetch.provider";

ReactDOM.render(
  <React.StrictMode>
    {/* <FetchProvider> */}
    <App />
    {/* </FetchProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
