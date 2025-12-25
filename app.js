const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Enable CORS for all origins (for testing/development)
// In production, you can restrict to your frontend domain
app.use(cors({
  origin: 'https://2quick-frontend.netlify.app', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true, // if you use cookies or auth
}));

// JSON parsing with size limit
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Health check / root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend API!');
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
