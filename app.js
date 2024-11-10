const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.EXPRESS_PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/index.router"));

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 501;
  return res.status(status).json({
    status: status,
    code: status,
    stack: err.stack,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
