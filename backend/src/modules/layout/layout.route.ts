import { Router } from "express";
import {
  GetLayoutByType,
  GetSingleLayoutById,
  Layout,
  UpdateLayout,
} from "./layout.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// CREATE LAYOUT API
router.post("/create-layout", auth(USER_ROLE.admin), Layout);

// GET ALL LAYOUTS API
router.get("/:type", GetLayoutByType);

// UPDATE LAYOUT API
router.patch("/update-layout", auth(USER_ROLE.admin), UpdateLayout);

// single layout
router.get("/get-layout/:id", GetSingleLayoutById);

export const LayoutRoutes = router;
