const express = require("express");
require("dotenv").config();

require("./database/init.mysql.database");

const app = express();

const indexRouter = require("./routes/index.router");

app.get("/api", indexRouter);

// Lắng nghe server
app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server running at http://localhost:${port}`);
});
