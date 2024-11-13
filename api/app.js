// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const indexRoutes = require("./routes"); // Đảm bảo đã import đúng

const app = express();
require("dotenv").config();

// Middleware và các cấu hình khác
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng routes
app.use("/api", indexRoutes); // Đảm bảo rằng bạn sử dụng prefix "/api" cho route chính

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error: process.env.NODE_ENV === "development" ? error : {},
  });
});

// Khởi động server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
