import { CorsOptions } from "cors";

export const corsOption: CorsOptions = {
  origin: ["http://localhost:5172"],
  credentials: true,
  optionsSuccessStatus: 200,
};
