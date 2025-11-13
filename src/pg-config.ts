import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./api/v1/models/user_details_model";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",
  entities: [User],
  migrations: ["./dist/migrations/*.js"],
  synchronize: false,
  logging: false,
});
