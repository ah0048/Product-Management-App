const express = require('express');
const connectDatabase = require('./config/db');
// const errorHandler = require('./middlewares/errorHandler'); // Import the error handler

const app = express();
require('dotenv').config();

// Connect to the database
connectDatabase();

// Middleware
app.use(express.json());

// // Your routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));

// // Global error handler
// app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
