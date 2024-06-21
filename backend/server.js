const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Connect Database
connectDB();

// CORS Options
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use the environment variable or default to frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get("/",(req,res)=>{
  return res.json("Hello")
})
// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
