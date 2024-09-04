import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validateLogin, validateRegister } from "../middlewares/validateData";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);


export default router;
