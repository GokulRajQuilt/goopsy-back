import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction } from "express";
import { AppDataSource } from "./pg-config";
import * as settings from "./settings";

export async function createServer() {
  const app = express();
  app.use(cors());
  app.use(cors(settings.corsOption));
  app.use(bodyParser.json());
  app.use(express.json());

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
