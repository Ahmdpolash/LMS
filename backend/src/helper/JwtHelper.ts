import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

const generateJwtToken = (payload: any, secret: Secret, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn } as any);
};

// verify jwt token
const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = { generateJwtToken, verifyToken };

export interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: boolean | "lax" | "strict" | "none";
}

const accessTokenExpireDays =
  Number(config.jwt.jwt_access_token_expiresIn) || 5;
const refreshTokenExpireDays =
  Number(config.jwt.jwt_refresh_token_expiresIn) || 30;

// Access Token Cookie Options
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpireDays * 24 * 60 * 60 * 1000),  // 24 BAD JABE
  maxAge: accessTokenExpireDays * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: config.node_env === "production",
  sameSite: "lax",
};

// Refresh Token Cookie Options
export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpireDays * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpireDays * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: config.node_env === "production",
  sameSite: "lax",
};
