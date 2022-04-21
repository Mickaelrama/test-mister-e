import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./assets/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={null}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Suspense>
);
