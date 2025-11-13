import { Request, Response } from "express";
import { AuthService } from "../services/auth_service";

const authService = new AuthService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password are required" });
    }

    const result = await authService.registerUser(username, password, email);

    return res.status(201).json({
      message: "User registered successfully",
      userId: result.id,
    });
  } catch (err: any) {
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

    return res.status(200).json({ message: "Login successful" });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};
