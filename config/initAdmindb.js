const axios = require("axios");

const createAdmin = async () => {
  const adminData = {
    username: "admin",
    password: "admin",
    fullname: "admin",
    gender: "MALE",
    position: "ADMIN",
    phoneNum: "admin",
    email: "admin",
    address: "admin",
  };

  try {
    const response = await axios.post(
      `http://localhost:3001/api/auth/staff/register`,
      adminData
    );
  } catch (error) {
    console.error("Error creating admin:", error.message || error);
  }
};

const createStudent = async () => {
  const StudentData = {
    studentCode: "20214075",
    password: "123",
    fullname: "Trần Thanh Bình",
    gender: "Male",
    roomNum: "123",
    email: "20214075",
  };

  try {
    const response = await axios.post(
      `http://localhost:3001/api/auth/student/register`,
      StudentData
    );
  } catch (error) {
    console.error("Error creating admin:", error.message || error);
  }
};

createAdmin();
createStudent();
