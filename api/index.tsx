import express from 'express';
import cors from 'cors';
import gameRoutes from './module/game/game.route';
import authRoutes from './module/auth/auth.route';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL, // HARUS spesifik
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/game', gameRoutes);
app.use('/api/auth', authRoutes);

export default app;