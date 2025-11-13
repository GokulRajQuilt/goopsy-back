import bcrypt from "bcrypt";
import { AppDataSource } from "../../../pg-config";
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
      username: username,
      password: hashedPassword,
      email: email,
    });

    return this.userRepo.save(newUser);
  }

  async validateLogin(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid;
  }

  async getUserById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }
}
