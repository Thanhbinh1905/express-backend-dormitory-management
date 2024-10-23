const express = require("express");
const route = express.Router();
const studentRouter = require("./staff.router");

route.use("/staff", studentRouter);

module.exports = route;
