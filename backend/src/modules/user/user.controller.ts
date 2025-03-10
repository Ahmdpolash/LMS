import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import httpStatus from "http-status";
const CreateStudent = catchAsync(async (req, res) => {
  const result = await UserServices.CreateStudentIntoDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

const GetAllStudentFromDb = catchAsync(async (req, res) => {
  const result = await UserServices.GetAllStudentFromDb();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Student retrived successfully",
    data: result,
  });
});

export const UserControllers = { CreateStudent, GetAllStudentFromDb };
