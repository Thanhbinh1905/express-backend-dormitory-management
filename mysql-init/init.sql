-- SHOW DATABASES;
-- SHOW TABLES;
USE quanlykytucxa2024;
-- DROP TABLE Students;
-- Sinh vien 
-- Bảng Sinh viên
CREATE TABLE Students (
    StudentID INT AUTO_INCREMENT PRIMARY KEY, 
    StudentCode VARCHAR(50) NOT NULL UNIQUE, -- MSV
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other'), -- Phân loại giới tính
    Class VARCHAR(20),
    BirthDate DATE,
    PhoneNumber VARCHAR(20),
    Email VARCHAR(255) NOT NULL UNIQUE, -- Đảm bảo email là duy nhất
    Address VARCHAR(500),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng Nhân viên
CREATE TABLE Staff (
    StaffID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE, -- Đảm bảo tên người dùng là duy nhất
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other'), -- Phân loại giới tính
    Position ENUM('ADMIN', 'DM') NOT NULL,
    PhoneNumber VARCHAR(20),
    Email VARCHAR(255) NOT NULL UNIQUE, -- Đảm bảo email là duy nhất
    Address VARCHAR(500),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng Khu vực
CREATE TABLE Areas (
    AreaID INT AUTO_INCREMENT PRIMARY KEY,
    AreaName VARCHAR(100) NOT NULL,
    StaffID INT,
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

-- Bảng Phòng
CREATE TABLE Rooms (
    RoomID INT AUTO_INCREMENT PRIMARY KEY,
    RoomCode VARCHAR(50) UNIQUE NOT NULL,
    Capacity INT NOT NULL,
    CurrentOccupants INT DEFAULT 0, -- Số lượng người đang ở hiện tại
    Status ENUM('Available', 'Unavailable'), -- Trạng thái phòng
    AreaID INT,
    FOREIGN KEY (AreaID) REFERENCES Areas(AreaID)
);

-- Bảng Đăng ký Phòng
CREATE TABLE RoomRegistrations (
    RegistrationID INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT,
    RoomID INT,
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Accepted', 'Pending', 'Declined') DEFAULT 'Pending',
    CancelledAt TIMESTAMP NULL,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID)
);

-- Bảng Trả Phòng
CREATE TABLE RoomReturns (
    ReturnID INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT,
    RoomID INT,
    ReturnDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Accepted', 'Pending', 'Declined') DEFAULT 'Pending',
    CancelledAt TIMESTAMP NULL,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID)
);

-- Bảng Hóa đơn Tiện ích
CREATE TABLE UtilityBills (
    BillID INT AUTO_INCREMENT PRIMARY KEY,
    RoomID INT NOT NULL,
    BillDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ElectricityAmount DECIMAL(10, 2),
    WaterAmount DECIMAL(10, 2),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID)
);

-- Bảng Thông báo
CREATE TABLE Notifications (
    NotificationID INT AUTO_INCREMENT PRIMARY KEY,
    SenderID INT NOT NULL,
    ReceiverID INT NOT NULL,
    Title TEXT NOT NULL,
    Message TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsRead BOOLEAN DEFAULT FALSE,
    NotificationType ENUM('room_info', 'general') NOT NULL,
    FOREIGN KEY (SenderID) REFERENCES Staff(StaffID),
    FOREIGN KEY (ReceiverID) REFERENCES Students(StudentID)
);

-- Bảng Báo cáo
CREATE TABLE Reports (
    ReportID INT AUTO_INCREMENT PRIMARY KEY,
    SenderID INT NOT NULL,
    ReceiverID INT NOT NULL,
    Title TEXT NOT NULL,
    Content TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'Reviewed', 'Resolved') DEFAULT 'Pending',
    FOREIGN KEY (SenderID) REFERENCES Students(StudentID),
    FOREIGN KEY (ReceiverID) REFERENCES Staff(StaffID)
);


INSERT INTO Staff (Username, Password, FullName, Position, Email)
VALUES ('admin', '1', 'admin', 'ADMIN', 'Admin');




