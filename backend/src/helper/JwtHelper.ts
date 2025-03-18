import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateJwtToken = (payload: any, secret: Secret, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn } as any);
};

// verify jwt token
const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = { generateJwtToken, verifyToken };
