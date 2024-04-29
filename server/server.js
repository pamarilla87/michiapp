import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import formRoutes from './routes/formRoutes.js';
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './database.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());

// Database connection
connectDB();

app.use('/api/form', formRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/events', authRoutes);

app.listen(port, host, () => {
    console.log(`Server running on port ${port}`);
});
