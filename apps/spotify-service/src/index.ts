import dotenv from "dotenv";
import express, { Request, Response } from "express";

import { getAccessToken } from "./service/getAccessToken";
import { getAuthorizationTokenURI } from "./service/getAuthorizationToken";
import { getCurrentlyPlaying } from "./service/getCurrentlyPlaying";
import { getMoongooseClient } from "./service/getMongooseClient";
import { retriveAccessToken, storeAccessToken } from "./service/token-storage";
dotenv.config();

const app = express();
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello TurboRepo");
});
app.get("/callback", async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code) {
    throw new Error("No Code found");
  }
  const token = await getAccessToken(code as string);
  if (!token) {
    console.log("Failed to get access token");
    res.sendStatus(500).send("Failed to get access token");
    return;
  }
  await storeAccessToken(token);
  res.redirect("/song");
});
app.get("/authorization", async (req, res) => {
  const redirect_uri = await getAuthorizationTokenURI();
  res.redirect(307, redirect_uri);
});

app.get("/song", async (req, res) => {
  const token = await retriveAccessToken();
  if (!token) {
    res.redirect(303, "/authorization");
    return;
  }
  const data = await getCurrentlyPlaying(token.accessToken);
  if (data) {
    res.json(data);
    return;
  }
  res.send("No songs are being played");
});

const startServer = async () => {
  const { readFileSync } = await import("fs");
  const Https = await import("https");
  const path = await import("path");
  const options = {
    key: readFileSync(path.join(__dirname, "../certs/key.pem")),
    cert: readFileSync(path.join(__dirname, "../certs/cert.pem")),
  };
  const server = Https.createServer(options, app);
  await getMoongooseClient();
  server.listen(3000, () => console.log("Server started on port 3000"));
};
if ((process.env.NODE_ENV || "").toLowerCase() === "local") {
  startServer();
}

export default app;
