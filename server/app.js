const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json())
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

// Router Import
app.use(require('./routes/auth'));


app.get('/', (req, res) => {
    res.send('hello world')
})

// Add this middleware to set the appropriate CORS headers
// This handles the cors error while deploying
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://gen-z-store.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const allowedOrigins = ['https://gen-z-store.vercel.app'];

// Configure CORS to allow only the specified origins
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Enable credentials (cookies, Authorization headers, etc.)
  })
);

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

// API for payment
app.post('/payment/create', async (req, res) => {
    const total = req.body.amount;
    // console.log("Payment request recieved for this rupees", total);

    const payment = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: 'inr',
    });

    res.status(201).send({
        clientSecret: payment.client_secret,
    })
})

module.exports = app;


