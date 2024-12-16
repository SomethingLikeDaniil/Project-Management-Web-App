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

// Variable Constant
const token = process.env.TOKEN;
const port_API: any = process.env.PORT;
const port_BD: any = process.env.PORT_BD;
const secretKey = "key";

// Connexion to BDD
const pool: Pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: port_BD,
});

// ============================ All GET ============================
// GET utilisateur
app.get('/utilisateur', async (_req: Request, _res: Response): Promise<void> => {
  console.log("requête passé");
  try {
    const result = await pool.query('SELECT * FROM "utilisateur"');
    console.log(result.rows, "la requête");
    _res.json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    _res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// GET tache
app.get('/tache', async (_req: Request, _res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM "tache"');
    _res.json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    _res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// GET projet
app.get('/projet', async (_req: Request, _res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM "projet"');
    _res.json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    _res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// GET categorie
app.get('/categorie', async (_req: Request, _res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM "categorie"');
    _res.json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    _res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// GET home
app.get("/", (req: Request, res: Response) => {
res.send("Bienvenue dans notre premiere API")
});


// ============================ All POST ============================
// POST utilisateur
app.post('/utilisateur', async (req: Request, res: Response): Promise<void> => {
  try {
      console.log('Received body:', req.body);
      const { nom, prenom, poste } = req.body;

      if (!nom || !prenom || !poste) {
          res.status(400).json({ error: "Missing required fields" });
          return;
      }

      const query = `INSERT INTO "utilisateur" (nom, prenom, poste) VALUES ($1, $2, $3)`;
      await pool.query(query, [nom, prenom, poste]);

      console.log("Generated token:", token);

      res.status(201).json({ message: "User created" });
  } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

// POST tache
app.post('/tache', async (req: Request, res: Response): Promise<void> => {
  try {
      console.log('Received body:', req.body);
      const { id_projet, nom, resume, numberperson, id_utilisateur, status } = req.body;

      if (!id_projet || !nom || !resume || !numberperson || !id_utilisateur || !status) {
          res.status(400).json({ error: "Missing required fields" });
          return;
      }

      const query = `INSERT INTO "tache" (id_projet, nom, resume, numberperson, id_utilisateur, status) VALUES ($1, $2, $3, $4, $5, $6)`;
      await pool.query(query, [id_projet, nom, resume, numberperson, id_utilisateur, status]);

      console.log("Generated token:", token);

      res.status(201).json({ message: "User created" });
  } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

// POST projet
app.post('/projet', async (req: Request, res: Response): Promise<void> => {
  try {
      console.log('Received body:', req.body);
      const { id_categorie, nom, numberperson, id_utilisateur, resume } = req.body;

      if (!id_categorie || !nom || !numberperson || !id_utilisateur || !resume) {
          res.status(400).json({ error: "Missing required fields" });
          return;
      }

      const query = `INSERT INTO "tache" (id_categorie, nom, numberperson, id_utilisateur, resume) VALUES ($1, $2, $3, $4, $5)`;
      await pool.query(query, [id_categorie, nom, numberperson, id_utilisateur, resume]);

      console.log("Generated token:", token);

      res.status(201).json({ message: "User created" });
  } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

// POST categorie
app.post('/categorie', async (req: Request, res: Response): Promise<void> => {
  try {
      console.log('Received body:', req.body);
      const { nom, resume } = req.body;

      if ( !nom || !resume) {
          res.status(400).json({ error: "Missing required fields" });
          return;
      }

      const query = `INSERT INTO "categorie" (nom, resume) VALUES ($1, $2)`;
      await pool.query(query, [nom, resume]);

      console.log("Generated token:", token);

      res.status(201).json({ message: "User created" });
  } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

// ============================ UPDATE ============================
// UPDATE utilisateur
app.put('/utilisateur/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nom, prenom, poste } = req.body;

    const query = `UPDATE "utilisateur" SET nom = $1, prenom = $2, poste = $3 WHERE id = $4`;
    await pool.query(query, [nom, prenom, poste, id]);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});

// UPDATE projet
app.put('/projet/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { id_categorie, nom, numberPerson, id_utilisateur, resume } = req.body;

    const query = `UPDATE "projet" SET id_categorie = $1, nom = $2, numberPerson = $3, id_utilisateur = $4, resume = $5 WHERE id = $6`;
    await pool.query(query, [id_categorie, nom, numberPerson, id_utilisateur, resume, id]);

    res.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'An error occurred while updating the project.' });
  }
});

// UPDATE categorie
app.put('/categorie/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nom, resume } = req.body;

    const query = `UPDATE "categorie" SET nom = $1, resume = $2 WHERE id = $3`;
    await pool.query(query, [nom, resume, id]);

    res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'An error occurred while updating the category.' });
  }
});

// UPDATE tache
app.put('/tache/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { id_projet, nom, resume, numberPerson, id_utilisateur, status } = req.body;

    const query = `UPDATE "tache" SET id_projet = $1, nom = $2, resume = $3, numberPerson = $4, id_utilisateur = $5, status = $6 WHERE id = $7`;
    await pool.query(query, [id_projet, nom, resume, numberPerson, id_utilisateur, status, id]);

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'An error occurred while updating the task.' });
  }
});

// ============================ DELETE ============================
// DELETE utilisateur
app.delete('/utilisateur/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM "utilisateur" WHERE id = $1`;
    await pool.query(query, [id]);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

// DELETE projet
app.delete('/projet/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM "projet" WHERE id = $1`;
    await pool.query(query, [id]);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'An error occurred while deleting the project.' });
  }
});

// DELETE categorie
app.delete('/categorie/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM "categorie" WHERE id = $1`;
    await pool.query(query, [id]);

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'An error occurred while deleting the category.' });
  }
});

// DELETE tache
app.delete('/tache/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM "tache" WHERE id = $1`;
    await pool.query(query, [id]);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'An error occurred while deleting the task.' });
  }
});

// ============================ OTHER ============================
// app listen
app.listen(port_API, () => {
  console.log(`Notre serveur run en http://localhost:${port_API}`)
})