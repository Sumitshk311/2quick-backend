const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));  // Sirf ek hi baar express.json() lagao, direct limit ke saath

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce Backend API!');
});

app.use(errorHandler);

module.exports = app;
