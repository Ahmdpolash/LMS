import catchAsync from "../../utils/catchAsync";
import { CreateLayout, EditLayout } from "./layout.services";
import { GetLayout } from "./layout.services";

// create layout
export const Layout = catchAsync(async (req, res) => {
  const { type } = req.body;

  const result = await CreateLayout(type, req);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

// get layout

export const GetLayoutByType = catchAsync(async (req, res) => {
  const { type } = req.params;

  const result = await GetLayout(type);

  res.status(200).json({
    success: true,
    message: "layout retrieved successfully",
    data: result,
  });
});

// edit layout
export const UpdateLayout = catchAsync(async (req, res) => {
  const { type } = req.body;

  const result = await EditLayout(type, req);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});
