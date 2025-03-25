import catchAsync from "../../utils/catchAsync";
import { CreateLayout } from "./layout.services";
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

export const GetAllLayout = catchAsync(async (req, res) => {
  const result = await GetLayout();

  res.status(200).json({
    success: true,
    message: "layout retrieved successfully",
    data: result,
  });
});
