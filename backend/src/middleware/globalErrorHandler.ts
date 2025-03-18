import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import config from "../config";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  err.message = err.message || "something went wrong";

  if (err.name === "CastError") {
    const message = `Resource not Found. Invalid: ${err.path}`;
    err = new AppError(message, 400);
  }

  // duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new AppError(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new AppError(message, 400);
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired, try again`;
    err = new AppError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: config.node_env === "development" ? err?.stack : null,
  });

  // next();
};
