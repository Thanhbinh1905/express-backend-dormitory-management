const express = require("express");
const route = express.Router();
const staffController = require("../controllers/staff.controller");

route.get("/", staffController.getAllStaffs);

module.exports = route;
