const RoomService = require("../services/room.service");

class RoomController {
  async getAllRooms(req, res, next) {
    return await RoomService.getAllRooms(req, res, next);
  }

  async getRoomById(req, res, next) {
    return await RoomService.getRoomById(req, res, next);
  }

  async findAllStudentsInByRoom(req, res, next) {
    return await RoomService.findAllStudentsInByRoom(req, res, next);
  }

  //   async findAllStudentsInRoomByStudentId(req, res, next) {
  //     return await RoomService.findAllStudentsInRoomByStudentId(req, res, next);
  //   }

  async findRoomAndStudentsByStudentId(req, res, next) {
    return await RoomService.findRoomAndStudentsByStudentId(req, res, next);
  }
}

module.exports = new RoomController();
