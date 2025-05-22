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
import redis from "../../redis";
import { generateStudentId } from "../../utils/generateRandomId";

// CREATE USER
const CreateUser = async (payload: IUser) => {
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
    subject: "Activate Your ELearning Account",
    templateName: "activation",
    replacements: {
      name: payload.name,
      activationCode,
    },
  });

  // redis.set(userExists.)

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

  // 6 digit random id generator
  const userId = generateStudentId();

  // create a new user
  await User.create({
    name,
    email,
    password,
    userId,
  });
};

// GET ALL USERS
const GetAllUSers = async () => {
  const result = await User.find().sort({ createdAt: -1 }).lean();

  return result;
};

// GET ME

const getMe = async (id: string) => {
  const result = await User.findById(id).populate({
    path: "courses.courseId",
    select: 'thumbnail.url name purchasedDate'
  });

  return result;
};

// SOCIAL AUTH
const SocialAuth = async (payload: ISocialAuth, res: Response) => {
  try {
    const user = await User.findOne({ email: payload.email });
    const userId = generateStudentId();

    if (!user) {
      const newUser = await User.create({ ...payload, userId });
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

// UPDATE USER ROLE -- FOR ADMIN ONLY
const updateUserRole = async (payload: { id: string; role: string }) => {
  // validat role
  const validRoles = ["user", "admin", "instructor"];

  if (!validRoles.includes(payload.role)) {
    throw new AppError("Invalid role", httpStatus.BAD_REQUEST);
  }

  // Find user
  const user = await User.findById(payload.id);

  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  // Check if user is deleted or blocked
  if (user.isDeleted || user.status === "blocked") {
    throw new AppError(
      "Cannot update role. User is either deleted or blocked.",
      httpStatus.FORBIDDEN
    );
  }

  const result = await User.findByIdAndUpdate(
    payload.id,
    { role: payload.role },
    { new: true }
  );

  return result;
};

// DELETE USR

const deleteUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("user not found", 404);
  }

  const result = await User.findByIdAndDelete(id);

  await redis.del(id);

  return result;
};

//UPLOAD IMAGE

export const UserServices = {
  CreateUser,
  ActivateUser,
  GetAllUSers,
  getMe,
  SocialAuth,
  UpdateUser,
  updateUserRole,
  deleteUser,
};
