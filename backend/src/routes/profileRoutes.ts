// src/routes/dataRoutes.ts

import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import { getDataForAuthenticatedUser } from "../controllers/profileController";

const router = Router();

// Use the authenticated route to get data for the logged-in user
router.get("/profile", authenticate, getDataForAuthenticatedUser);

export default router;
