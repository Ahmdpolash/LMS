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
  path: string;
}

// for testing
const accessTokenExpireDays = 1 / (24 * 60);
const refreshTokenExpireDays = 2 / (24 * 60);

// const accessTokenExpireDays = 1;
// const refreshTokenExpireDays = 30;

// Access Token Cookie Options
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpireDays * 24 * 60 * 60 * 1000),
  maxAge: accessTokenExpireDays * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: config.node_env === "production" ? "none" : "lax",
  secure: config.node_env === "production" ? true : false,

  path: "/",
};

// Refresh Token Cookie Options
export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpireDays * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpireDays * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: config.node_env === "production" ? "none" : "lax",
  secure: config.node_env === "production" ? true : false,
  path: "/",
};
