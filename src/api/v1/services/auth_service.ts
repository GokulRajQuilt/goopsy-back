import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../../config/pg-config";
import { User } from "../models/user_details_model";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async registerUser(username: string, password: string, email?: string) {
    const existing = await this.userRepo.findOne({ where: { username } });

    if (existing) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepo.create({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await this.userRepo.save(newUser);
    return savedUser.id;
  }

  async validateLogin(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid;
  }

  generateAccessToken(username: string, userId: string): string {
    const secret = process.env.JWT_SECRET_KEY as string;
    if (!secret) {
      throw new Error("Unknown error");
    }

    return jwt.sign({ username, userId }, secret);
  }

  async getUserById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  async getUserByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
}
