// index.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("../config/db");
const userRoutes = require("../routes/userRoutes");
const companyRoutes = require("../routes/companyRoutes");
const adminRoutes = require("../routes/adminRoutes");
const path = require("path");
// Connect to MongoDB
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use("/admins", adminRoutes);


// For serving the React app or any other static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
