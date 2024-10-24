const express = require("express");
const router = express.Router();

const staffRouter = require("./staff.router");
router.use("/staff", staffRouter);

const roomRouter = require("./room.router")
router.use("/rooms", roomRouter);
module.exports = router;
