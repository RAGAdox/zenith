import express from "express";
import path from "path";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import webpack, { Configuration } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import clientConfig from "../webpack.client.config";
import App from "./app";

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

server.use(
  "/static",
  express.static(path.resolve(__dirname, "../dist"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);

server.get("*", (req, res) => {
  console.log("Route requested:", req.url);
  const stream = renderToPipeableStream(
    <html>
      <head>
        <title>TEST TITLE</title>
      </head>
      <body>
        <div id="root">
          <App initialRoute={req.url} />
        </div>
      </body>
    </html>,
    {
      bootstrapScripts: ["/static/vendors.bundle.js", "/static/main.bundle.js"],
      onShellReady() {
        res.setHeader("content-type", "text/html");
        stream.pipe(res);
      },
      onShellError(error) {
        res.statusCode = 500;
        res.send(`<p>Loading...</p><p>${error}</p>`);
      },
      onError(error, errorInfo) {
        console.error(error);
        console.error(errorInfo);
      },
    }
  );
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
