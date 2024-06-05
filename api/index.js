// index.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("../config/db");
const userRoutes = require("../routes/userRoutes");
const companyRoutes = require("../routes/companyRoutes");
const adminRoutes = require("../routes/adminRoutes");
const path = require("path");
const fileUpload = require("express-fileupload");
const fs = require("fs");

// Connect to MongoDB
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(fileUpload());

app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use("/admins", adminRoutes);

// Middleware to handle file uploads
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for file uploads
app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedFile = req.files.file;
  const uploadPath = path.join(__dirname, "../public/uploads", uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(`File uploaded successfully: ${uploadPath}`);
  });
});

// For serving the React app or any other static files
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
