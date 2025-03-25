import { Router } from "express";
import { GetAllLayout, Layout } from "./layout.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post("/create-layout", auth(USER_ROLE.admin), Layout);

router.get("/", GetAllLayout);

export const LayoutRoutes = router;
