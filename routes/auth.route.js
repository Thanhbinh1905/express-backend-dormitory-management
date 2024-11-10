const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const {
  authentication,
  isStaff,
  isStudent,
} = require("../middlewares/auth.middleware");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new BadRequestError(error.details[0].message));
      return;
    }
    next();
  };
};

// Staff
router.post("/staff/login", AuthController.staffLogin);
router.post("/staff/register", AuthController.staffRegister);
router.post(
  "/staff/change-password",
  authentication,
  isStaff,
  AuthController.staffChangePassword
);
router.post(
  "/staff/logout",
  authentication,
  isStaff,
  AuthController.staffLogout
);
// Student
router.post("/student/login", AuthController.studentLogin);
router.post("/student/register", AuthController.studentRegister);
router.post("/student/change-password", AuthController.studentChangePassword);
router.post(
  "/student/logout",
  authentication,
  isStudent,
  AuthController.staffLogout
);

module.exports = router;
