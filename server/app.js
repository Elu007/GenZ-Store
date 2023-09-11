const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import the product model
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});


// API to Add product in database
app.post("/api/products/add", async (req, res) => {
    try {
        const productDetail = req.body;
        const data = await Product.create(productDetail);
        res.status(201).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
});

// API to get products from database
app.get('/api/products/get', async (req, res) => {
    try {
        const category = req.query.category; // Get the category query parameter
        let query = {}; // Initialize an empty query object

        if (category) {
            query = { category }; // If a category is specified, include it in the query
        }

        const data = await Product.find(query);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// API to get specific products
app.get('/api/products/get/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);

    try {
        const product = await Product.findById(id);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

// Create a new API route for category filtering
app.get('/api/products/getByCategory', async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ error: 'Category parameter is required.' });
        }

        const data = await Product.find({ category });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = app;


