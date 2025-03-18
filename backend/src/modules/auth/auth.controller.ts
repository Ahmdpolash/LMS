import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";

// LOGIN USER
const LoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.LoginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production", // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1yr
  });

  res.status(200).json({
    success: true,
    message: "User logged in Successfully",
    data: {
      accessToken,
      user,
    },
  });
});

// LogOut

const LogOut = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await AuthServices.LogOut(userId);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    success: true,
    message: result.message,
  });
});

export const AuthControllers = { LoginUser, LogOut };
