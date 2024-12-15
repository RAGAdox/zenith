import express, { Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import webpack, { Configuration } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import clientConfig from "../webpack.client.config";
import App from "./App";

const server = express();

if (process.env.NODE_ENV === "development") {
  const compiler = webpack(clientConfig as Configuration);
  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: clientConfig.output.publicPath,
    })
  );
  server.use(webpackHotMiddleware(compiler));
}
server.use(express.static("dist"));

server.get("*", (req: Request, res: Response) => {
  const content = renderToString(
    React.createElement(App, { initialRoute: req.url })
  );
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__ROUTE__ = "${req.url}";
        </script>
        <script src="/vendors.bundle.js"></script>
        <script src="/main.bundle.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
