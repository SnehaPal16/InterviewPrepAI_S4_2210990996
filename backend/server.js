require("dotenv").config();
const express = require("express");
const path = require("path");
// db connection--->

const authRoutes = require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth' , authRoutes);
app.use('/api/questions' , questionRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(_dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5060;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));