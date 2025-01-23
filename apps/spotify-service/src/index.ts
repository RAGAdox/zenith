import express, { Request, Response } from "express";

const app = express();
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello TurboRepo");
});

app.listen(3000, () => console.log("server started"));
