import {
  accessTokenOptions,
  jwtHelper,
  refreshTokenOptions,
} from "../helper/JwtHelper";
import config from "../config";

import { IUser } from "../modules/user/user.interface";
import redis from "../redis";
import { Response } from "express";

export const sendToken = async (user: IUser, res: Response) => {
  // 1. Generate Access Token
  const accessToken = jwtHelper.generateJwtToken(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt.jwt_access_token as string,
    // config.jwt.jwt_access_token_expiresIn as string
    '1d'
  );

  // 2. Generate Refresh Token
  const refreshToken = jwtHelper.generateJwtToken(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt.jwt_refresh_token as string,
    config.jwt.jwt_refresh_token_expiresIn as string
  );

  // 3. Save session in Redis (user._id as key)
  await redis.set(user._id.toString(), JSON.stringify(user));

  // 4. Set Cookies
  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  // 5. Send Response
  res.status(200).json({
    success: true,
    message: "Login Successful!",
    data: {
      accessToken,
      user,
    },
  });
};
