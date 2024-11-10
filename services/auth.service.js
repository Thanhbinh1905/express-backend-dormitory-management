const AuthenticateModel = require("../models/auth.model");
const {
  CreatedResponse,
  OkResponse,
} = require("../responses/success.response");
const {
  BadRequestError,
  UnauthorizedError,
} = require("../responses/error.response");
const jwt = require("jsonwebtoken");

class AuthService {
  async staffLogin(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new BadRequestError("Missing required fields");
      }

      const staff = await AuthenticateModel.loginStaff(username, password);

      if (!staff) {
        throw new UnauthorizedError("Invalid credentials");
      }

      // Create JWT token
      const token = jwt.sign(
        {
          id: staff.StaffID,
          role: "staff",
          position: staff.Position,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      delete staff.Password;

      return new OkResponse({
        message: "Login successful",
        metadata: {
          staff,
          token,
        },
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async staffRegister(req, res, next) {
    try {
      const {
        username,
        password,
        fullname,
        gender,
        position,
        phoneNum,
        email,
        address,
      } = req.body;

      if (!username || !password || !fullname || !position || !email) {
        throw new BadRequestError("Missing required fields");
      }

      const staffId = await AuthenticateModel.createStaff(
        username,
        password,
        fullname,
        gender,
        position,
        phoneNum,
        email,
        address
      );

      return new CreatedResponse({
        message: "Staff registered successfully",
        metadata: { staffId },
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async staffChangePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const staffId = req.user.id;

      if (!currentPassword || !newPassword) {
        throw new BadRequestError("Missing required fields");
      }

      const result = await AuthenticateModel.changePWStaff(
        staffId,
        currentPassword,
        newPassword
      );

      return new OkResponse({
        message: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async studentLogin(req, res, next) {
    try {
      const { studentCode, password } = req.body;

      if (!studentCode || !password) {
        throw new BadRequestError("Missing required fields");
      }

      const student = await AuthenticateModel.loginStudent(
        studentCode,
        password
      );

      if (!student) {
        throw new UnauthorizedError("Invalid credentials");
      }

      const token = jwt.sign(
        {
          id: student.StudentID,
          role: "student",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      delete student.Password;

      return new OkResponse({
        message: "Login successful",
        metadata: {
          student,
          token,
        },
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async studentRegister(req, res, next) {
    try {
      const {
        studentCode,
        password,
        fullname,
        gender,
        birthDate,
        phoneNum,
        email,
        address,
      } = req.body;

      if (!studentCode || !password || !fullname || !email) {
        throw new BadRequestError("Missing required fields");
      }

      const studentId = await AuthenticateModel.createStudent(
        studentCode,
        password,
        fullname,
        gender,
        birthDate,
        phoneNum,
        email,
        address
      );

      return new CreatedResponse({
        message: "Student registered successfully",
        metadata: { studentId },
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async studentChangePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const studentId = req.user.id;

      if (!currentPassword || !newPassword) {
        throw new BadRequestError("Missing required fields");
      }

      const result = await AuthenticateModel.changePWStudent(
        studentId,
        currentPassword,
        newPassword
      );

      return new OkResponse({
        message: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async staffLogout(req, res, next) {
    try {
      // Có thể thêm logic xử lý logout ở đây nếu cần
      // Ví dụ: xóa token khỏi database, blacklist token, etc.

      return new OkResponse({
        message: "Logged out successfully",
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async studentLogout(req, res, next) {
    try {
      // Có thể thêm logic xử lý logout ở đây nếu cần
      // Ví dụ: xóa token khỏi database, blacklist token, etc.

      return new OkResponse({
        message: "Logged out successfully",
      }).send(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthService();
