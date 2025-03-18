import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import httpStatus from "http-status";

// CREATE ACCOUNT
const CreateUser = catchAsync(async (req, res) => {
  const result = await UserServices.CreateStudentIntoDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Please check your email to activate your account",
    data: result,
  });
});

// ACTIVATE ACCOUNT
const ActivateUser = catchAsync(async (req, res) => {
  const result = await UserServices.ActivateUser(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Account activated successfully",
    data: result,
  });
});

// GET ALL STUDENTS

const GetAllStudentFromDb = catchAsync(async (req, res) => {
  const result = await UserServices.GetAllStudentFromDb();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Student retrived successfully",
    data: result,
  });
});

//GET ME
const GetMe = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await UserServices.getMe(userId);

  res.status(200).json({
    success: true,
    message: "User data fetched successfully",
    data: result,
  });
});

export const UserControllers = {
  CreateUser,
  ActivateUser,
  GetAllStudentFromDb,
  GetMe,
};
