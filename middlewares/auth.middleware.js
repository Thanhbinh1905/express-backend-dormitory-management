// middlewares/auth.middleware.js

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../responses/error.response");

const authentication = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new UnauthorizedError("Invalid token"));
      return;
    }
    if (error.name === "TokenExpiredError") {
      next(new UnauthorizedError("Token expired"));
      return;
    }
    next(error);
  }
};

// Middleware to check if user is staff
const isStaff = (req, res, next) => {
  try {
    if (req.user.role !== "staff") {
      throw new UnauthorizedError("Access denied. Staff only.");
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if user is student
const isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      throw new UnauthorizedError("Access denied. Student only.");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
  isStaff,
  isStudent,
};
