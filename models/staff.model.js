const db = require("../config/db");

const Staff = {
  getAll: (callback) => {
    const query = "SELECT * FROM Staff";
    db.query(query, callback);
  },
};

module.exports = Staff;
