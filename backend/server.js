require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const {protect} = require("./middlewares/authMiddleware");
const {generateInterviewQuestions , generateInterviewExplanation} = require("./controllers/aiController");

const app = express();

// Middleware
app.use(express.json());

//ROUTES
app.use('/api/auth' , authRoutes);
app.use('/api/sessions' , sessionRoutes);
app.use('/api/questions' , questionRoutes);

app.use("/api/ai/generate-questions", protect , generateInterviewQuestions);
app.use("/api/ai/generate-explanations", protect , generateInterviewExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
  });
});