import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    token?: string;
    userId?: string;
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers) {
    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader ? bearerHeader.split(" ") : [];
    const bearerToken = bearer[1];
    req.token = bearerToken;

    if (req.token === process.env.TOKEN) {
      return next();
    } else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }

  return next(new Error("Unauthorized access"));
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerToken = getTokenFromRequest(req);
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    req.token = bearerToken;
    if (bearerToken && jwtSecretKey) {
      const decoded = jwt.verify(bearerToken, jwtSecretKey) as JwtPayload & {
        userId?: string;
        appSessionId?: string;
      };

      if (!decoded.userId) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      req.token = bearerToken;
      req.userId = decoded.userId;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

export const getTokenFromRequest = (req: Request): string | undefined => {
  const bearerHeader = req.headers["authorization"];
  const bearer = bearerHeader ? bearerHeader.split(" ") : [];
  return bearer[1];
};

export const getUserIdFromToken = (token?: string): string => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!token || !jwtSecretKey) {
    return "";
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload & {
      userId?: string;
    };

    return decoded.userId ?? "";
  } catch (error) {
    console.error("Token verification failed:", error);
    return "";
  }
};
