import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import httpStatus from "http-status";

// CREATE ACCOUNT
const CreateUser = catchAsync(async (req, res) => {
  const result = await UserServices.CreateUser(req.body);

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

const GetAllUSers = catchAsync(async (req, res) => {
  const result = await UserServices.GetAllUSers();

  res.status(httpStatus.OK).json({
    success: true,
    message: "All users retrived successfully",
    data: result,
  });
});

//GET ME
const GetMe = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const result = await UserServices.getMe(_id);

  res.status(200).json({
    success: true,
    message: "My data fetched successfully",
    data: result,
  });
});

//SOCIAL AUTH

const SocialAuth = catchAsync(async (req, res) => {
  await UserServices.SocialAuth(req.body, res);
});

// UPDATE

const UpdateUser = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const result = await UserServices.UpdateUser(_id, req.body);

  res.status(200).json({
    success: true,
    message: "User data updated successfully",
    data: result,
  });
});

export const UserControllers = {
  CreateUser,
  ActivateUser,
  GetAllUSers,
  GetMe,
  SocialAuth,
  UpdateUser,
};
