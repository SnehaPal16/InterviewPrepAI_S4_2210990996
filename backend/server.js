require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();

//middleware
app.use(express.json());

app.use('/uploads' , express.static(path.join(__dirname , "uploads") , {}));

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Server Running On http://localhost:${PORT}`));