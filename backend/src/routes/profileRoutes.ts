// src/routes/dataRoutes.ts

import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import { getDataForAuthenticatedUser } from "../controllers/profileController";

const router = Router();

router.get("/profile", authenticate, getDataForAuthenticatedUser);

export default router;
