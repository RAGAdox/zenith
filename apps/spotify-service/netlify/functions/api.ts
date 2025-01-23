import express from "express";
import serverless from "serverless-http";
import app from "../../src/index";

const api = express();

api.use("/api/", app);

export const handler = serverless(api);
