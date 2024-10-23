const Staff = require("../models/staff.model");

class StaffController {
  getAllStaffs = (req, res) => {
    Staff.getAll((err, students) => {
      if (err) return res.status(500).json({ error: err });
      res.json(students);
    });
  };
}

module.exports = new StaffController();
