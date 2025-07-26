import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import issueRoutes from './routes/issueRoutes.js';
import express from 'express';

dotenv.config();

const app = express();


app.use((req, res, next) => {
  console.log('Incoming origin:', req.headers.origin);
  next();
});


app.use(cors({
  origin: function (origin, callback) {
    const isLocalhost = origin?.startsWith('http://localhost:5173');
    const isVercel = origin?.endsWith('.vercel.app');

    if (!origin || isLocalhost || isVercel) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection failed:", err.message));


app.use('/api/issues', issueRoutes);


app.get('/', (req, res) => {
  res.send('🚀 Issue Tracker Backend is running!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
