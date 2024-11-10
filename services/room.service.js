const RoomModel = require("../models/room.model");
const {
  OkResponse,
  NotFoundResponse,
} = require("../responses/success.response");
const { BadRequestError } = require("../responses/error.response");
const AuthenticateModel = require("../models/auth.model");

class RoomService {
  async getAllRooms(req, res, next) {
    try {
      const rooms = await RoomModel.findAll();

      return new OkResponse({
        message: "Get all rooms successfully",
        metadata: { rooms },
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async getRoomById(req, res, next) {
    try {
      const { id } = req.params;
      const room = await RoomModel.findById(id);

      if (!room) {
        throw new BadRequestError("Room not found");
      }

      return new OkResponse({
        message: "Get room successfully",
        metadata: { room },
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  async findAllStudentsInByRoom(req, res, next) {
    try {
      const { id } = req.params;
      const room = await RoomModel.findById(id);

      if (!room) {
        throw new BadRequestError("Room not found");
      }

      const students = await RoomModel.findAllStudentsInByRoom(id);

      return new OkResponse({
        message: "Get students in room successfully",
        metadata: {
          room,
          students,
        },
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  //   async findAllStudentsInRoomByStudentId(req, res, next) {
  //     try {
  //       const { studentId } = req.params;

  //       // Kiểm tra xem student có tồn tại không
  //       const student = await AuthenticateModel.getStudentById(studentId);
  //       if (!student) {
  //         throw new BadRequestError("Student not found");
  //       }

  //       const students = await RoomModel.findAllStudentsInRoomByStudentId(
  //         studentId
  //       );

  //       return new OkResponse({
  //         message: "Get students in room successfully",
  //         metadata: {
  //           students,
  //         },
  //       }).send(res);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  async findRoomAndStudentsByStudentId(req, res, next) {
    try {
      const { studentId } = req.params;

      const student = await AuthenticateModel.getStudentById(studentId);
      if (!student) {
        throw new BadRequestError("Student not found");
      }

      const result = await RoomModel.findRoomAndStudentsByStudentId(studentId);

      if (!result) {
        return new NotFoundResponse({
          message: "Student is not currently in any room",
        }).send(res);
      }

      return new OkResponse({
        message: "Get room and students successfully",
        metadata: result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoomService();
