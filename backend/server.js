require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const questionRoutes = require('./routes/questionRoutes');

const app = express();

//Riddleware to handle CORS

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB();

// Middleware
app.use(express.json());
// app.use('/api/auth' , authRoutes);
// app.use('/api/sessions' , sessionRoutes);
app.use('/api/questions' , questionRoutes);

// app.use("/api/ai/generate-questions", protect , generateInterviewQuestions);
// app.use("/api/ai/generate-explanations", protect , generateInterviewExplanation);

// Routes
// Serve uploads folder
app.use("/uploads", express.static(path.join(_dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5060;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));