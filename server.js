import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import issueRoutes from './routes/issueRoutes.js';
import express from 'express';

dotenv.config();

const app = express();

// ✅ Log incoming origins for CORS debugging
app.use((req, res, next) => {
  console.log('Incoming origin:', req.headers.origin);
  next();
});

// ✅ Define allowed origins (local + Vercel)
const allowedOrigins = [
  'http://localhost:5173',
  'https://issue-tracker-crud-frontend.vercel.app',
  'https://issue-tracker-crud-frontend-79n6.vercel.app'
];

// ✅ Configure CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(allowed => allowed.toLowerCase() === origin.toLowerCase())) {
      callback(null, true);
    } else {
      console.error('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection failed:", err.message));

// ✅ API routes
app.use('/api/issues', issueRoutes);

// ✅ Optional root route
app.get('/', (req, res) => {
  res.send('🚀 Issue Tracker Backend is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
