import React from "react";
import { hydrateRoot } from "react-dom/client";
import Router from "./router";

const container = document.getElementById("root");

const render = () => {
  hydrateRoot(container!, <Router />);
};
render();
