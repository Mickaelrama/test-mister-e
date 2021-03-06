import React from "react";
import ReactDOM from "react-dom/client";
import CustomCursorProvider from "./components/custom-cursor-provider";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./assets/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CustomCursorProvider>
      <Router />
    </CustomCursorProvider>
  </BrowserRouter>
);
