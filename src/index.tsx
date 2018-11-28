import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import "antd/dist/antd.less";
import "./index.less";

const rootElement = document.getElementById("app");

ReactDOM.render(<App />, rootElement);
