const express = require('express');
const connectDatabase = require('./config/db');
const errorHandler = require('./middlewares/errorHandler'); // Import the error handler
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
require('dotenv').config();

// Connect to the database
connectDatabase();

// Middleware
app.use(express.json());

// my routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/',(req, res) => {
    res.status(200).send('api running...')
})

// Global error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
