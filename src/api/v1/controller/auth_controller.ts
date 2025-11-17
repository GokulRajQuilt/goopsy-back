import { Request, Response } from "express";
import { failure, success } from "../../network/base_response";
import { AuthService } from "../services/auth_service";

const authService = new AuthService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const { username, password, email } = req.body;

    console.log("req.body", req.body);

    if (!username || !password) {
      return res
        .status(400)
        .json(failure(400, "username and password are required"));
    }

    const result = await authService.registerUser(username, password, email);

    return res
      .status(201)
      .json(success("User registered successfully", result));
  } catch (err: any) {
    console.log("err", err);
    return res.status(400).json({ message: err.message });
  }
};

export const loginWithUsername = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }

    const isValid = await authService.validateLogin(username, password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = await authService.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = authService.generateAccessToken(username, user.id);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res
      .status(200)
      .json(success("Login successful", { userId: user.id }));
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};
