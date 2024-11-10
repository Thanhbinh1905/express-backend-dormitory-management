const AuthService = require("../services/auth.service");

class AuthController {
  // Staff Controllers
  async staffLogin(req, res, next) {
    return await AuthService.staffLogin(req, res, next);
  }

  async staffRegister(req, res, next) {
    return await AuthService.staffRegister(req, res, next);
  }

  async staffChangePassword(req, res, next) {
    return await AuthService.staffChangePassword(req, res, next);
  }
  async staffLogout(req, res, next) {
    return await AuthService.staffLogout(req, res, next);
  }

  // Student Controllers
  async studentLogin(req, res, next) {
    return await AuthService.studentLogin(req, res, next);
  }

  async studentRegister(req, res, next) {
    return await AuthService.studentRegister(req, res, next);
  }

  async studentChangePassword(req, res, next) {
    return await AuthService.studentChangePassword(req, res, next);
  }
  async studentLogout(req, res, next) {
    return await AuthService.staffLogout(req, res, next);
  }
}

module.exports = new AuthController();
