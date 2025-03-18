import AppError from "../../errors/AppError";
import { IActivteUser, IUser } from "./user.interface";
import { User } from "./user.models";
import httpStatus from "http-status";
import { createActivationToken, verifyToken } from "./user.utils";
import { sendEmail } from "../../utils/sendMail";
import config from "../../config";

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
  await sendEmail(payload.email, payload.name, activationCode);

  return { activationToken: token };
};

// ACTIVATE USER
const ActivateUser = async (payload: IActivteUser) => {
  //verify token
  const tokenInfo = await verifyToken(
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

export const UserServices = {
  CreateStudentIntoDb,
  ActivateUser,
  GetAllStudentFromDb,
};
