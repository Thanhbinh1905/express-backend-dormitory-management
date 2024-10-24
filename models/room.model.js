db = require("../config/db");

const Rooms = {
    getAll: (callback) => {
        const query =  "SELECT * FROM Rooms"
         db.query(query, callback);
    },
    // getAllStudentInAllRooms: (callback) => {
    //     const sql = `
    //         WITH LatestRoomRegistrations AS (
    //             SELECT 
    //                 rr.StudentID,
    //                 rr.RoomID,
    //                 rr.RegistrationDate,
    //                 rr.Status,
    //                 r.RoomCode
    //             FROM 
    //                 RoomRegistrations rr
    //             JOIN 
    //                 Rooms r ON rr.RoomID = r.RoomID
    //             WHERE 
    //                 rr.Status = 'Accepted'
    //             AND 
    //                 rr.RegistrationDate = (
    //                     SELECT MAX(RegistrationDate)
    //                     FROM RoomRegistrations
    //                     WHERE StudentID = rr.StudentID
    //                 )
    //         )
    //         SELECT 
    //             s.StudentID,
    //             s.FullName,
    //             s.StudentCode,
    //             lrr.RoomID,
    //             lrr.RoomCode,
    //             lrr.RegistrationDate,
    //             lrr.Status
    //         FROM 
    //             LatestRoomRegistrations lrr
    //         JOIN 
    //             Students s ON lrr.StudentID = s.StudentID
    //         LEFT JOIN 
    //             RoomReturns rr ON rr.StudentID = lrr.StudentID 
    //                            AND rr.RoomID = lrr.RoomID
    //                            AND rr.ReturnDate > lrr.RegistrationDate
    //         WHERE 
    //             rr.ReturnID IS NULL;
    //     `;
    //     db.query(sql, callback);
    // },
    findAllStudentsInByRoom: (roomId, callback) => {
        const sql = `
            WITH LatestRoomRegistrations AS (
                SELECT 
                    rr.StudentID,
                    rr.RoomID,
                    rr.RegistrationDate,
                    rr.Status,
                    r.RoomCode
                FROM 
                    RoomRegistrations rr
                JOIN 
                    Rooms r ON rr.RoomID = r.RoomID
                WHERE 
                    rr.Status = 'Accepted'
                    AND rr.RoomID = ?
                    AND rr.RegistrationDate = (
                        SELECT MAX(RegistrationDate)
                        FROM RoomRegistrations
                        WHERE StudentID = rr.StudentID
                          AND RoomID = rr.RoomID
                    )
            )
            SELECT 
                s.StudentID,
                s.FullName,
                s.StudentCode,
                lrr.RoomID,
                lrr.RoomCode,
                lrr.RegistrationDate,
                lrr.Status
            FROM 
                LatestRoomRegistrations lrr
            JOIN 
                Students s ON lrr.StudentID = s.StudentID
            LEFT JOIN 
                RoomReturns rr ON rr.StudentID = lrr.StudentID 
                               AND rr.RoomID = lrr.RoomID
                               AND rr.ReturnDate > lrr.RegistrationDate
            WHERE 
                rr.ReturnID IS NULL;
        `;
        db.query(sql, [roomId], callback); // Truyền RoomID vào câu truy vấn
    }
};

module.exports = Rooms