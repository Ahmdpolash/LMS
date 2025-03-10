import jwt from "jsonwebtoken";
import { IUser } from "./user.interface";
import config from "../../config";


export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: IUser): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    config.jwt_access_token as string,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};
