const db = require("../config/db");
const bcrypt = require("bcrypt");

const Staff = {
  getAll: (callback) => {
    const query = "SELECT * FROM Staff";
    db.query(query, callback);
  },
  getById: (staffID, callback) => {
    const query = "SELECT * FROM Staff WHERE StaffID = ?";
    db.query(query, [staffID], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      return callback(null, results[0]);
    });
  },
  login: (username, password, callback) => {
    const query = "SELECT * FROM Staff WHERE Username = ?";
    BroadcastChannel.query(query, [username], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      
      const staff = results[0];
      bcrypt.compare(password, staff.password, (err, isMatch) => {
        if (err) return callback(err, null);
        if (isMatch) {
          return callback(null, staff);
        } else  {
          return callback(null, null)
        }
      });
    });
  },
  create: (username, password, fullname, gender, position, phoneNum, email, address, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      const query = "INSERT INTO Staff (Username, Password, Fullname, Gender, Position, PhoneNumber, Email, Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      db.query(query, [username, hashedPassword, fullname, gender, position, phoneNum, email, address], (err, result) => {
        if (err) return callback(err);
        return callback(null, result.insertId)
      });

    });
  },
  delete: (staffId, callback) => {
    const query = "DELETE FROM Staff WHERE StaffTD = ?"
    db.query(query, [staffId], (err, results) => {
      if (err) return callback(err);
      if (results.affectedRows === 0) return callback(null, false);
      return callback(null, true)
    });
  },
  update: (staffID, updates, callback) => {
    const fields = [];
    const values = [];

    Object.keys(updates).forEach((key) => {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    });

    const query = `
      UPDATE Staff 
      SET ${fields.join(', ')} 
      WHERE StaffID = ?`;
    
    values.push(staffID);  // Add staffID to the query parameters
    
    db.query(query, values, (err, result) => {
      if (err) return callback(err);
      if (result.affectedRows === 0) return callback(null, false);  // No rows updated
      return callback(null, true);  // Update successful
    });
  },
  changePassword: (staffId, currentPassword, newPassword, callback) => {
    const query = "SELECT * FROM Staff WHEN StaffID = ?";
    db.query(query, [staffId], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);

      const staff = results[0];

      bcrypt.compare(currentPassword, staff.Password, (err, isMatch) => {
        if (err) return callback(err);
        if (!isMatch) return callback(null, "Current password is incorrect");
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
          if (err) return callback(err);

          const updatedQuery = "UPDATE Staff SET Password = ? WHERE StaffID = ?";
          db.query(query, [hashedPassword, staffId], (err, isMatch) => {
            if (err) return callback(err);
            return callback(null, {message: "Password changed successfully!"})
          })
        });
      });
    });
  }
};

module.exports = Staff;
