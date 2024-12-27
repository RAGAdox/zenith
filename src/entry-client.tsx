import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import Router from "./Router";

const url = new URL(window.location.href);
const path = url.pathname;

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <Router url={path} />
  </StrictMode>
);
