const Staff = require("../models/staff.model");

const StaffController = {
  getAllStaffs: (req, res) => {
    Staff.getAll((err, students) => {
      if (err) return res.status(500).json({ error: err });
      res.json(students);
    });
  },
  getById: (req, res) => {
    const staffID = req.params.id;
    Staff.getById(staffID, (err, staff) => {
      if (err) {
        return res.status(500).json({message: "Error when retrieving staff", error: err});
      }
      if(!staff) {
        return res.status(404).json({message: "Staff not found"})
      }
      return res.status(200).json(staff)
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    try {
      Staff.login(username, password, (err, staff) => {
        if (err) {
          return res.status(500).json({message: "Error Logging in", error, err});
        }
        if (!staff) {
          return res.status(401).json({ message: "Invalid Username or Password"});
        }
        res.status(200).json({ message: "Login successfully", staff});
      })
    } catch (error) {
      return res.status(500).json({message: "Error Logging in", error: error});
    }
  },
  create: (req, res) => {
    const {username, password, fullname, gender, position, phoneNum, email, address} = req.body;
    try {
      Staff.create(username, password, fullname, gender, position, phoneNum, email, address, (err, staffId) => {
        if (err) {
          return res.status(500).json({message :'Error creating account', error: err});
        }
        return res.status(201).json({ message: 'Staff created successfully', staffId });
      })
    } catch(error) {
      return res.status(500).json({message :'Error creating account', error: error});
    }
  },
  update: (req, res) => {
    const staffID = req.params.id;
    const updates = req.body;
    try {
      Staff.update(staffID, updates, (err, result) => {
        if (err) {
          return res.stats(500).json({message: "Error when updating staff", error: err});
        }
        if (!result) {
          return res.stats(404).json({message: "Staff not found"});
        }
        return res.stats(200).json({message: "Staff updated successfully"});
      })
    } catch {error} {
      return res.stats(500).json({message: "Error when updating staff", error: error});
    }
  },
  delete: (req, res) => {
    const staffID = req.params.id;
    try {
      Staff.delete(staffID, (err, result) => {
        if (err) {
          return res.stats(500).json({message: "Error when deleting staff", error: err});
        }
        if (!result) {
          return res.stats(404).json({message: "Staff not found"});
        }
        return res.stats(200).json({message: "Staff daleted successfully"});
      })
    } catch {error} {
      return res.stats(500).json({message: "Error when deleting staff", error: error});
    }
  },
  changePassword: (req, res) => {
    const staffID = req.params.id;
    const { currentPassword, newPassword } = req.body;
    try {
      Staff.changePassword(staffID, currentPassword, newPassword, (err, result) => {
        if (err) {
          return res.stats(500).json({message: "Error when changing password", error: err});
        }
        if (!result) {
          return res.stats(404).json({message: "Staff not found", error: err});
        }
        if (result.message) {
          return res.status(400).json(result);
        } 
        return res.status(200).json(result); 
      });
    } catch (error) {
      
    }
  }
}

module.exports =  StaffController;
