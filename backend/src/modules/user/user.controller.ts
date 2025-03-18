import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import httpStatus from "http-status";


// CREATE ACCOUNT
const CreateStudent = catchAsync(async (req, res) => {
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

export const UserControllers = {
  CreateStudent,
  ActivateUser,
  GetAllStudentFromDb,
};
