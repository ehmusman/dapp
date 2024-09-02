import { body } from "express-validator";

// Validation middleware for user registration
export const validateRegister = [
  body("username")
    .isString()
    .isLength({ min: 3 })
    .trim()
    .escape()
    .withMessage("Username must be at least 3 characters long"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation middleware for user login
export const validateLogin = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
