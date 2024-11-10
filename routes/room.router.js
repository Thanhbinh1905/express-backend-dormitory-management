const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/room.controller");
const { authentication } = require("../middlewares/auth.middleware");

router.get("/", authentication, roomsController.getAllRooms);
router.get("/:id", authentication, roomsController.getRoomById);
router.get(
  "/:id/students",
  authentication,
  roomsController.findAllStudentsInByRoom
);
// router.get(
//   "/students/:studentId",
//   authentication,
//   roomsController.findAllStudentsInRoomByStudentId
// );
router.get(
  "/student/:studentId/room",
  authentication,
  roomsController.findRoomAndStudentsByStudentId
);

module.exports = router;
