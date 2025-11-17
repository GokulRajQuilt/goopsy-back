import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction } from "express";
import * as api from "./api";
import { AppDataSource } from "./pg-config";
import * as settings from "./settings";

export async function createServer() {
  const app = express();

  app.use(cookieParser());
  app.use(cors(settings.corsOption));
  app.use(bodyParser.json());
  app.use(express.json());

  app.use(`${process.env.MOUNT_PATH}/v1`, api.v1.default);
  app.use(`${process.env.MOUNT_PATH}/v2`, api.v2.default);

  app.get("/health", (req, res) => {
    res.status(200).json({ message: "Healthy" });
  });

  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) =>
      console.log("Error during Data Source initialization", error)
    );

  app.use(function errorHandler(
    err: any,
    req: any,
    res: any,
    next: NextFunction
  ) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Unexpected error occurred" });
  });

  return app;
}
