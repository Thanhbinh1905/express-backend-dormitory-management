const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// Middleware để parse JSON
app.use(express.json());

// Kết nối đến MySQL
const db = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "quanlykytucxa2024",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

// Route ví dụ
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Lắng nghe server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
