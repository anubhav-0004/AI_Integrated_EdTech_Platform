const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const aiRoutes = require('./routes/ai.routes');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://ai-integrated-ed-tech-platform.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

module.exports = app;