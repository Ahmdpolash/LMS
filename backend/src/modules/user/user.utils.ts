import jwt from "jsonwebtoken";
import { IUser } from "./user.interface";
import config from "../../config";

interface IActivationToken {
  token: string;
  activationCode: string;
}

// generate random activation code
export const createActivationToken = (user: IUser): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    config.jwt.activation_token as string,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};
