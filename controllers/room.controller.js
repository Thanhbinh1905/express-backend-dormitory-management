const Rooms = require('../models/room.model');

const RoomController = {
    getAllRooms : (req, res) => {
        Rooms.getAll((err, results) => {
            if (err) return res.status(500).json({error : err });
            res.status(200).json(results)
        })
    },
    findAllStudentsInByRoom: (req, res) => {
        const roomId = req.params.id;
        Rooms.findAllStudentsInByRoom(roomId, (err, results) => {
            if (err) return res.status(500).json({error: err});
            res.status(200).json(results)
        })
        
    }
}

module.exports = RoomController