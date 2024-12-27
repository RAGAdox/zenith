import { StrictMode } from "react";
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import Router from "./Router";

export function render(url: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <StrictMode>
      <Router url={url} />
    </StrictMode>,
    options
  );
}
