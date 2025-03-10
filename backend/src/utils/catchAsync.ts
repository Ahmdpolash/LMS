import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (Fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(Fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
