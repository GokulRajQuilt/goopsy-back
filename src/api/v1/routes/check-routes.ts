import { Router } from "express";
import { verifyToken } from "../../../middlewares/authentication";
import { success } from "../../network/base_response";

export const checkRouter = Router();

checkRouter.get("/health", (req, res) => {
  res.status(200).json({ message: "Healthy" });
});

checkRouter.get("/check-token", verifyToken, (req, res) => {
  res
    .status(200)
    .json(success("Token is valid", { message: "Token is valid" }));
});
