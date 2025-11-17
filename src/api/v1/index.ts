import express from "express";
import { authRouter } from "./routes/auth-routes";
import { checkRouter } from "./routes/check-routes";

const v1 = express.Router();
v1.use("/auth", authRouter);
v1.use(checkRouter);

export default v1;
