import express from "express";
import * as authController from "../controller/auth_controller";

export const authRouter = express.Router();

authRouter.post("/login-with-username", authController.loginWithUsername);
authRouter.post("/register", authController.registerUser);
