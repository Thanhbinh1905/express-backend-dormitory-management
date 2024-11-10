const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/rooms", require("./room.router"));

module.exports = router;
