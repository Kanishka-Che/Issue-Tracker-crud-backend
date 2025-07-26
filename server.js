import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import issueRoutes from './routes/issueRoutes.js';
import express from 'express'; 

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173/'
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log("MongoDB connected")})
  .catch((err) => {console.log("Database connection failed:" ,err.message)});

app.use('/api/issues', issueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
