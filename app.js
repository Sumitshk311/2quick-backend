const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'https://2quick-frontend.netlify.app', // restrict to frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true, // only needed if you use cookies/auth
}));

// JSON parsing with size limit
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// Root route for health check
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend API!');
});

// Error handling middleware (after all routes)
app.use(errorHandler);

module.exports = app;
