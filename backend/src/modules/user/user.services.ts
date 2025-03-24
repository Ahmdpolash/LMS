import AppError from "../../errors/AppError";
import { IActivteUser, ISocialAuth, IUser } from "./user.interface";
import { User } from "./user.models";
import httpStatus from "http-status";
import { createActivationToken } from "./user.utils";
import { sendEmail } from "../../utils/sendMail";
import config from "../../config";
import { jwtHelper } from "../../helper/JwtHelper";
import { sendToken } from "../../utils/sentToken";
import { Response } from "express";
import { redis } from "../../redis";

// CREATE USER
const CreateStudentIntoDb = async (payload: IUser) => {
  // check if user email is already registered
  const userExists = await User.isUserExistsByEmail(payload.email);

  if (userExists) {
    throw new AppError("This user already exists", httpStatus.CONFLICT);
  }

  //generate token
  const activationToken = createActivationToken(payload);
  const activationCode = activationToken.activationCode;
  const token = activationToken.token;

  // Send activation email
  // await sendEmail(payload.email, payload.name, activationCode);

  await sendEmail({
    to: payload.email,
    subject: "Activate Your LMS Account",
    templateName: "activation",
    replacements: {
      name: payload.name,
      activationCode,
    },
  });

  return { activationToken: token };
};

// ACTIVATE USER
const ActivateUser = async (payload: IActivteUser) => {
  //verify token
  const tokenInfo = await jwtHelper.verifyToken(
    payload.activation_token,
    config.jwt.activation_token as string
  );

  // check if activation code is valid
  if (tokenInfo.activationCode !== payload.activation_code) {
    throw new AppError("Invalid activation code", httpStatus.BAD_REQUEST);
  }

  const { name, email, password } = tokenInfo.user;

  //check if the user is already registered
  const isExistsUser = await User.findOne({ email });
  if (isExistsUser) {
    throw new AppError("This user already exists", httpStatus.CONFLICT);
  }

  // create a new user
  await User.create({
    name,
    email,
    password,
  });
};

// GET ALL USERS
const GetAllStudentFromDb = async () => {
  const result = await User.find();

  return result;
};

// GET ME

const getMe = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

// SOCIAL AUTH
const SocialAuth = async (payload: ISocialAuth, res: Response) => {
  try {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      const newUser = await User.create(payload);
      return sendToken(newUser, res);
    } else {
      return sendToken(user, res);
    }
  } catch (error: any) {
    throw new AppError(error.message, 400);
  }
};

// UPDATE USER

const UpdateUser = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError("User not found", 404);
  }

  await redis.set(id, JSON.stringify(result)); // ✅ Updated user data saved

  return result;
};

//UPLOAD IMAGE

export const UserServices = {
  CreateStudentIntoDb,
  ActivateUser,
  GetAllStudentFromDb,
  getMe,
  SocialAuth,
  UpdateUser,
};
