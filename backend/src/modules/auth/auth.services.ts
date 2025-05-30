import config from "../../config";
import AppError from "../../errors/AppError";
import { jwtHelper } from "../../helper/JwtHelper";
import { User } from "../user/user.models";
import { ILogin } from "./auth.interface";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import redis from "../../redis";
import cloudinary from "cloudinary";
import { storeSession } from "../../helper/storeSessionToRedis";

// LOGIN USER
const LoginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(
      "Please provide email and password",
      httpStatus.BAD_REQUEST
    );
  }
  // check the user availibility
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("user not found", httpStatus.NOT_FOUND);
  }

  // Check user status
  if (user.status === "blocked" || user.isDeleted) {
    throw new AppError(
      user.status === "blocked" ? "User is blocked" : "User is deleted",
      httpStatus.FORBIDDEN
    );
  }

  // check the password

  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new AppError("password do not matched", httpStatus.FORBIDDEN);
  }

  // token data
  const userData = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  // access token
  const accessToken = jwtHelper.generateJwtToken(
    userData,
    config.jwt.jwt_access_token as string,
    config.jwt.jwt_access_token_expiresIn as string
  );

  const refreshToken = jwtHelper.generateJwtToken(
    userData,
    config.jwt.jwt_refresh_token as string,
    config.jwt.jwt_refresh_token_expiresIn as string
  );

  await redis.set(
    user._id.toString(),
    JSON.stringify(user),
    "EX",
    config.jwt.redis_session_expiresIn_seconds || 30 * 24 * 60 * 60
  );

  // storeSession(user);

  return { accessToken, refreshToken, user };
};

// LOGOUT USER
const LogOut = async (id: string) => {
  // get the user from redis

  const session = await redis.get(id);

  if (!session) {
    throw new AppError("Session not found", httpStatus.NOT_FOUND);
  }


  await redis.del(id);
  
  return { message: "User logged out successfully" };
};

// REFRESH TOKEN
// const RefreshToken = async (token: string) => {
//   let decodedData;

//   try {
//     decodedData = jwtHelper.verifyToken(
//       token,
//       config.jwt.jwt_refresh_token as string
//     );
//   } catch (error) {
//     throw new Error("You are not authorized!");
//   }

//   const user = await User.findOne({ email: decodedData.email });
//   if (!user) {
//     throw new AppError("User not found", httpStatus.NOT_FOUND);
//   }

//   const accessToken = jwtHelper.generateJwtToken(
//     {
//       userId: user._id,
//       email: user.email,
//       role: user.role,
//     },
//     config.jwt.jwt_access_token as string,
//     config.jwt.jwt_access_token_expiresIn as string
//   );

//   return {
//     accessToken,
//   };
// };

const UpdateAccessToken = async (token: string) => {
  let decodedData;

  try {
    decodedData = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_refresh_token as string
    );
  } catch (error) {
    throw new AppError("You are not authorized!", httpStatus.UNAUTHORIZED);
  }

  if (!decodedData || !decodedData.userId) {
    throw new AppError("Invalid token payload", httpStatus.UNAUTHORIZED);
  }

  const session = await redis.get(decodedData.userId);

  if (!session) {
    throw new AppError(
      "Please login for access this resources",
      httpStatus.UNAUTHORIZED
    );
  }

  const user = JSON.parse(session);

  const accessToken = jwtHelper.generateJwtToken(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt.jwt_access_token as string,
    "20m"
    // config.jwt.jwt_access_token_expiresIn as string
  );

  const refToken = jwtHelper.generateJwtToken(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt.jwt_refresh_token as string,
    // config.jwt.jwt_refresh_token_expiresIn as string
    "5d"
  );

  return {
    accessToken,
    refToken,
    user,
  };
};

//CHANGE PASSWORD
const ChangePassword = async (
  id: string,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findById(id).select("+password");

  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  // compare password

  const isPasswordMatched: boolean = await bcrypt.compare(
    payload.oldPassword,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError("Old password is incorrect", httpStatus.FORBIDDEN);
  }

  user.password = payload.newPassword;

  await user.save();

  await redis.set(id, JSON.stringify(user));

  return user;
};

//TODO:: FORGOT PASSWORD

//TODO:: RESET PASSWORD

// UPDATE PROFILE PHOTO
const updatedProfilePhoto = async (id: string, payload: { avatar: string }) => {
  const { avatar } = payload;

  const user = await User.findById(id);

  if (avatar && user) {
    // first delete if avatar already exists
    if (user?.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    }
  }

  await user?.save();
  await redis.set(id, JSON.stringify(user));

  return user;
};

export const AuthServices = {
  LoginUser,
  LogOut,
  UpdateAccessToken,
  ChangePassword,
  updatedProfilePhoto,
};
