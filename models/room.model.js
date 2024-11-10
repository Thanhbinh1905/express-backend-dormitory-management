const db = require("../config/db");

class RoomModel {
  async findAll() {
    try {
      const [rows] = await db.query("SELECT * FROM Rooms");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async findById(roomId) {
    try {
      const [rows] = await db.query("SELECT * FROM Rooms WHERE RoomID = ?", [
        roomId,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findAllStudentsInByRoom(roomId) {
    try {
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
          s.Email,
          s.PhoneNumber,
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

      const [rows] = await db.query(sql, [roomId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  //   async findAllStudentsInRoomByStudentId(studentId) {
  //     try {
  //       const sql = `
  //         WITH CurrentRoom AS (
  //           SELECT
  //             rr.RoomID,
  //             r.RoomCode
  //           FROM
  //             RoomRegistrations rr
  //           JOIN
  //             Rooms r ON rr.RoomID = r.RoomID
  //           WHERE
  //             rr.StudentID = ?
  //             AND rr.Status = 'Accepted'
  //             AND rr.RegistrationDate = (
  //               SELECT MAX(RegistrationDate)
  //               FROM RoomRegistrations
  //               WHERE StudentID = rr.StudentID
  //             )
  //         ),
  //         LatestRoomRegistrations AS (
  //           SELECT
  //             rr.StudentID,
  //             rr.RoomID,
  //             rr.RegistrationDate,
  //             rr.Status,
  //             r.RoomCode
  //           FROM
  //             RoomRegistrations rr
  //           JOIN
  //             Rooms r ON rr.RoomID = r.RoomID
  //           JOIN
  //             CurrentRoom cr ON cr.RoomID = rr.RoomID
  //           WHERE
  //             rr.Status = 'Accepted'
  //             AND rr.RegistrationDate = (
  //               SELECT MAX(RegistrationDate)
  //               FROM RoomRegistrations
  //               WHERE StudentID = rr.StudentID
  //                 AND RoomID = rr.RoomID
  //             )
  //         )
  //         SELECT
  //           s.StudentID,
  //           s.FullName,
  //           s.StudentCode,
  //           s.Email,
  //           s.PhoneNumber,
  //           lrr.RoomID,
  //           lrr.RoomCode,
  //           lrr.RegistrationDate,
  //           lrr.Status
  //         FROM
  //           LatestRoomRegistrations lrr
  //         JOIN
  //           Students s ON lrr.StudentID = s.StudentID
  //         LEFT JOIN
  //           RoomReturns rr ON rr.StudentID = lrr.StudentID
  //                         AND rr.RoomID = lrr.RoomID
  //                         AND rr.ReturnDate > lrr.RegistrationDate
  //         WHERE
  //           rr.ReturnID IS NULL;
  //       `;

  //       const [rows] = await db.query(sql, [studentId]);
  //       return rows;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async findRoomAndStudentsByStudentId(studentId) {
    try {
      const sql = `
        WITH CurrentRoom AS (
          SELECT 
            rr.RoomID,
            r.RoomCode,
            r.Capacity,
            r.Status as RoomStatus,
            r.RoomFee,
            a.AreaName
          FROM 
            RoomRegistrations rr
          JOIN 
            Rooms r ON rr.RoomID = r.RoomID
          LEFT JOIN
            Areas a ON r.AreaID = a.AreaID
          WHERE 
            rr.StudentID = ?
            AND rr.Status = 'Accepted'
            AND rr.RegistrationDate = (
              SELECT MAX(RegistrationDate)
              FROM RoomRegistrations
              WHERE StudentID = rr.StudentID
            )
          AND NOT EXISTS (
            SELECT 1 FROM RoomReturns rt 
            WHERE rt.StudentID = rr.StudentID 
            AND rt.RoomID = rr.RoomID
            AND rt.ReturnDate > rr.RegistrationDate
          )
        ),
        RoomStudents AS (
          SELECT 
            s.StudentID,
            s.StudentCode,
            s.FullName,
            s.Gender,
            s.PhoneNumber,
            s.Email,
            rr.RegistrationDate,
            rr.Status as RegistrationStatus
          FROM 
            CurrentRoom cr
          JOIN 
            RoomRegistrations rr ON cr.RoomID = rr.RoomID
          JOIN 
            Students s ON rr.StudentID = s.StudentID
          WHERE 
            rr.Status = 'Accepted'
            AND rr.RegistrationDate = (
              SELECT MAX(RegistrationDate)
              FROM RoomRegistrations
              WHERE StudentID = s.StudentID
            )
          AND NOT EXISTS (
            SELECT 1 FROM RoomReturns rt 
            WHERE rt.StudentID = rr.StudentID 
            AND rt.RoomID = rr.RoomID
            AND rt.ReturnDate > rr.RegistrationDate
          )
        )
        SELECT 
                cr.*,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'studentId', rs.StudentID,
                        'studentCode', rs.StudentCode,
                        'fullName', rs.FullName,
                        'gender', rs.Gender,
                        'phoneNumber', rs.PhoneNumber,
                        'email', rs.Email,
                        'registrationDate', rs.RegistrationDate
                    )
                ) as students
            FROM 
                CurrentRoom cr
            LEFT JOIN 
                RoomStudents rs ON 1=1
            GROUP BY 
                cr.RoomID, cr.RoomCode, cr.Capacity, cr.RoomStatus, 
                cr.RoomFee, cr.AreaName;
        `;

      const [rows] = await db.query(sql, [studentId]);

      if (rows.length > 0) {
        // Kiểm tra kiểu dữ liệu của students
        if (typeof rows[0].students === "string") {
          try {
            rows[0].students = JSON.parse(rows[0].students);
          } catch (parseError) {
            throw new Error("Invalid JSON format for students");
          }
        } else if (Array.isArray(rows[0].students)) {
          // Nếu students đã là một mảng, không cần phân tích
          // Bạn có thể xử lý theo cách khác nếu cần
        } else {
          // Nếu không phải là chuỗi hoặc mảng, xử lý theo cách khác
          rows[0].students = []; // Hoặc xử lý theo cách khác nếu không phải là chuỗi
        }
      }

      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RoomModel();
