import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { Home } from "./container/Home";
import Layout from "./layouts/layouts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
