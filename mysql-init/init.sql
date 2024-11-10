USE quanlykytucxa2024;

-- Bảng Sinh viên
CREATE TABLE Students (
    StudentID CHAR(36) PRIMARY KEY DEFAULT (UUID()), 
    StudentCode VARCHAR(50) NOT NULL UNIQUE, -- MSV
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other'), -- Phân loại giới tính
    BirthDate DATE,
    PhoneNumber VARCHAR(20),
    Email VARCHAR(255) NOT NULL UNIQUE, -- Đảm bảo email là duy nhất
    Address VARCHAR(500),
    Avatar BLOB,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng Nhân viên
CREATE TABLE Staff (
    StaffID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    Username VARCHAR(255) NOT NULL UNIQUE, -- Đảm bảo tên người dùng là duy nhất
    Password VARCHAR(255) NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Other'), -- Phân loại giới tính
    Position ENUM('ADMIN', 'DM') NOT NULL,
    PhoneNumber VARCHAR(20),
    Email VARCHAR(255) NOT NULL UNIQUE, -- Đảm bảo email là duy nhất
    Address VARCHAR(500),
    Avatar BLOB,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng Khu vực
CREATE TABLE Areas (
    AreaID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    AreaName VARCHAR(100) NOT NULL,
    StaffID CHAR(36),
    FOREIGN KEY (StaffID) REFERENCES Staff(StaffID) ON DELETE SET NULL
);

-- Bảng Phòng
CREATE TABLE Rooms (
    RoomID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    RoomCode VARCHAR(50) UNIQUE NOT NULL,
    Capacity INT NOT NULL,
    Status ENUM('Available', 'Unavailable', 'Maintenance'), -- Trạng thái phòng
    AreaID CHAR(36),
    FOREIGN KEY (AreaID) REFERENCES Areas(AreaID) ON DELETE SET NULL,
    RoomFee DECIMAL(10, 2)
);

-- Bảng Đăng ký Phòng
CREATE TABLE RoomRegistrations (
    RegistrationID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    StudentID CHAR(36),
    RoomID CHAR(36),
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Accepted', 'Pending', 'Declined') DEFAULT 'Pending',
    CancelledAt TIMESTAMP NULL,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE,
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID) ON DELETE SET NULL
);

-- Bảng Trả Phòng
CREATE TABLE RoomReturns (
    ReturnID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    StudentID CHAR(36),
    RoomID CHAR(36),
    ReturnDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Accepted', 'Pending', 'Declined') DEFAULT 'Pending',
    CancelledAt TIMESTAMP NULL,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE,
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID) ON DELETE SET NULL
);

-- Bảng Hóa đơn Tiện ích
CREATE TABLE UtilityBills (
    BillID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    RoomID CHAR(36) NOT NULL,
    MonthDate INT NOT NULL,
    YearDate INT NOT NULL, 
    ElectricityAmount DECIMAL(10, 2),
    WaterAmount DECIMAL(10, 2),
    IsPaid BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID) ON DELETE CASCADE
);

-- Bảng Thông báo
CREATE TABLE Notifications (
    NotificationID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    SenderID CHAR(36) NOT NULL,
    ReceiverID CHAR(36) NOT NULL,
    Title TEXT NOT NULL,
    Content TEXT NOT NULL,
    IsRead BOOLEAN DEFAULT FALSE,
    NotificationType ENUM('room_info', 'general') NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (SenderID) REFERENCES Staff(StaffID) ON DELETE SET NULL,
    FOREIGN KEY (ReceiverID) REFERENCES Students(StudentID) ON DELETE CASCADE
);

-- Bảng Báo cáo
CREATE TABLE Reports (
    ReportID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    SenderID CHAR(36) NOT NULL,
    ReceiverID CHAR(36) NOT NULL,
    Title TEXT NOT NULL,
    Content TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pending', 'Reviewed', 'Resolved') DEFAULT 'Pending',
    FOREIGN KEY (SenderID) REFERENCES Students(StudentID) ON DELETE CASCADE,
    FOREIGN KEY (ReceiverID) REFERENCES Staff(StaffID) ON DELETE SET NULL
);

-- Bảng Token thiết bị
CREATE TABLE DeviceTokens (
    TokenID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    StudentID CHAR(36) NOT NULL,
    DeviceToken VARCHAR(255) NOT NULL,
    Platform ENUM('android', 'ios') NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE,
    UNIQUE KEY unique_token (DeviceToken)
);


INSERT INTO Areas (AreaID, AreaName, StaffID) VALUES 
(UUID(), 'Khu A', NULL),
(UUID(), 'Khu B', NULL),
(UUID(), 'Khu C', NULL);

-- Giả định các ID khu vực từ bảng Areas đã được tạo
-- và sử dụng `UUID()` để tạo giá trị ngẫu nhiên cho `RoomID`.

-- Dữ liệu mẫu cho bảng Rooms
INSERT INTO Rooms (RoomID, RoomCode, Capacity, Status, AreaID, RoomFee) VALUES
(UUID(), 'R101', 2, 'Available', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu A'), 1500.00),
(UUID(), 'R102', 4, 'Available', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu A'), 1800.00),
(UUID(), 'R103', 3, 'Maintenance', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu A'), 2000.00),
(UUID(), 'R201', 2, 'Unavailable', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu B'), 1200.00),
(UUID(), 'R202', 4, 'Available', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu B'), 1750.00),
(UUID(), 'R203', 3, 'Available', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu B'), 1900.00),
(UUID(), 'R301', 2, 'Maintenance', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu C'), 1600.00),
(UUID(), 'R302', 4, 'Available', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu C'), 2100.00),
(UUID(), 'R303', 3, 'Unavailable', (SELECT AreaID FROM Areas WHERE AreaName = 'Khu C'), 2200.00);

insert into RoomRegistrations (
    StudentID,
    RoomID,
    Status
) values ('63039bbc-9c80-11ef-991d-0242ac120002', '180a0b9c-9c7e-11ef-991d-0242ac120002', 'Accepted');