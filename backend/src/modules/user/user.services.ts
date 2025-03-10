import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.models";
import httpStatus from "http-status";
import { createActivationToken } from "./user.utils";
import path from "path";
import ejs from "ejs";
import { sendEmail } from "../../utils/sendMail";

const CreateStudentIntoDb = async (payload: IUser) => {
  const userExists = await User.isUserExistsByEmail(payload.email);

  if (userExists) {
    throw new AppError("This user already exists", httpStatus.CONFLICT);
  }

  const activationToken = createActivationToken(payload);
  const activationCode = activationToken.activationCode;

  // Create user in DB
  const newUser = await User.create(payload);

  // Send activation email
  await sendEmail(payload.email, payload.name, activationCode);

  return newUser;
};

const GetAllStudentFromDb = async () => {
  const result = await User.find();

  return result;
};

export const UserServices = { CreateStudentIntoDb, GetAllStudentFromDb };
