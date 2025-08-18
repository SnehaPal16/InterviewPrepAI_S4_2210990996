require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes');
const sessionRoutes = require('./routes/sessionRoutes')

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth' , authRoutes);
app.use('/api/questions' , questionRoutes);
app.use('/api/sessions' , sessionRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(_dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5060;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));