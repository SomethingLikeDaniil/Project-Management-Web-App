import express, { Express, NextFunction, Request, Response } from  "express";
import dotenv from "dotenv";
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { validationResult } from "express-validator";
const { body } = require('express-validator');

dotenv.config();

const app: Express = express();
app.use(express.json());

const token = process.env.TOKEN;
const port = process.env.PORT;
const secretKey = "key";

// Connexion to BDD
const pool: Pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: 5432,
})


app.get('/user', async (_req: Request, _res: Response): Promise<void> => {
    try {
      const result = await pool.query('SELECT * FROM public."User"');
      _res.json(result.rows);
    } catch (error) {
      console.error('Database query error:', error);
      _res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});