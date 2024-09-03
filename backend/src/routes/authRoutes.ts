import { Router } from "express";
import { register, login, session } from "../controllers/authController";
import authenticate from "../middlewares/authenticate";
import { validateLogin, validateRegister } from "../middlewares/validateData";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

router.get("/session", authenticate, session);

export default router;
