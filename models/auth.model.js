const { BadRequestError } = require("../responses/error.response");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class AuthenticateModel {
  async loginStaff(username, password) {
    try {
      const query = "SELECT * FROM Staff WHERE Username = ?";
      const [results] = await db.query(query, [username]);

      if (results.length === 0) return null;

      const staff = results[0];

      const isMatch = await bcrypt.compare(password, staff.Password);
      if (isMatch) {
        return staff;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async createStaff(
    username,
    password,
    fullname,
    gender,
    position,
    phoneNum,
    email,
    address
  ) {
    try {
      const checkQuery = "SELECT * FROM Staff WHERE Username = ? OR Email = ?";
      const [existing] = await db.query(checkQuery, [username, email]);

      if (existing.length > 0) {
        throw new BadRequestError("Username or email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
        INSERT INTO Staff (Username, Password, FullName, Gender, Position, PhoneNumber, Email, Address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await db.query(query, [
        username,
        hashedPassword,
        fullname,
        gender,
        position,
        phoneNum,
        email,
        address,
      ]);

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async changePWStaff(staffId, currentPassword, newPassword) {
    try {
      const query = "SELECT * FROM Staff WHERE StaffID = ?";
      const [results] = await db.query(query, [staffId]);

      if (results.length === 0) {
        throw new BadRequestError("Staff not found");
      }

      const staff = results[0];

      const isMatch = await bcrypt.compare(currentPassword, staff.Password);
      if (!isMatch) {
        throw new BadRequestError("Current password is incorrect");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const updateQuery = "UPDATE Staff SET Password = ? WHERE StaffID = ?";
      await db.query(updateQuery, [hashedNewPassword, staffId]);

      return "Password updated successfully";
    } catch (error) {
      throw error;
    }
  }

  async loginStudent(studentCode, password) {
    try {
      const query = "SELECT * FROM Students WHERE StudentCode = ?";
      const [results] = await db.query(query, [studentCode]);

      if (results.length === 0) return null;

      const student = results[0];

      const isMatch = await bcrypt.compare(password, student.Password);
      if (isMatch) {
        return student;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async createStudent(
    studentCode,
    password,
    fullname,
    gender,

    birthDate,
    phoneNum,
    email,
    address
  ) {
    try {
      // Check if student code or email already exists
      const checkQuery =
        "SELECT * FROM Students WHERE StudentCode = ? OR Email = ?";
      const [existing] = await db.query(checkQuery, [studentCode, email]);

      if (existing.length > 0) {
        throw new BadRequestError("Student code or email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
        INSERT INTO Students (StudentCode, Password, FullName, Gender, BirthDate, PhoneNumber, Email, Address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await db.query(query, [
        studentCode,
        hashedPassword,
        fullname,
        gender,
        birthDate,
        phoneNum,
        email,
        address,
      ]);

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  async changePWStudent(studentId, currentPassword, newPassword) {
    try {
      const query = "SELECT * FROM Students WHERE StudentID = ?";
      const [results] = await db.query(query, [studentId]);

      if (results.length === 0) {
        throw new BadRequestError("Student not found");
      }

      const student = results[0];

      const isMatch = await bcrypt.compare(currentPassword, student.Password);
      if (!isMatch) {
        throw new BadRequestError("Current password is incorrect");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const updateQuery =
        "UPDATE Students SET Password = ? WHERE StudentID = ?";
      await db.query(updateQuery, [hashedNewPassword, studentId]);

      return "Password updated successfully";
    } catch (error) {
      throw error;
    }
  }

  // Utility methods
  async getStudentById(studentId) {
    try {
      const query = "SELECT * FROM Students WHERE StudentID = ?";
      const [results] = await db.query(query, [studentId]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw error;
    }
  }

  async getStaffById(staffId) {
    try {
      const query = "SELECT * FROM Staff WHERE StaffID = ?";
      const [results] = await db.query(query, [staffId]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthenticateModel();
