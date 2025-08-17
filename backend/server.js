require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
// db connection--->

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
// Middleware

app.use(express.json());

app.use('/api/questions' , questionRoutes);

// Routes
// Serve uploads folder


app.use("/uploads", express.static(path.join(_dirname, "uploads"), {}));

// Start Server

const PORT = process.env.PORT || 5060;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));