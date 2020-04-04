import * as React from "react";
import * as ReactDOM from "react-dom";
import "./assets/styles/application.scss";
import { App } from "./components/App";

console.log("a");
ReactDOM.render(
  <App />,
  document.getElementById("entry-point")
);
