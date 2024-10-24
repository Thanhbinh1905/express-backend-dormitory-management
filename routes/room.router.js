const express = require("express");
const router = express.Router();
const roomsController = require('../controllers/room.controller');

router.get("/", roomsController.getAllRooms);
router.get("/:id/students", roomsController.findAllStudentsInByRoom);

module.exports = router


