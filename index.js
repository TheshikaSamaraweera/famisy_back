require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/files', express.static('files')); // Static file path for serving uploaded files
app.use(fileUpload());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
