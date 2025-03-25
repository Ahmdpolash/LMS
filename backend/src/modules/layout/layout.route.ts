import { Router } from "express";
import { GetAllLayout, Layout, UpdateLayout } from "./layout.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// CREATE LAYOUT API
router.post("/create-layout", auth(USER_ROLE.admin), Layout);

// GET ALL LAYOUTS API
router.get("/", GetAllLayout);

// UPDATE LAYOUT API
router.patch("/update-layout", auth(USER_ROLE.admin), UpdateLayout);

export const LayoutRoutes = router;
