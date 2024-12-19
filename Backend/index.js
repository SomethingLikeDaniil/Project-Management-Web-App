"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const { body } = require('express-validator');
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors('*'));
app.use(express_1.default.json());
// Variable Constant
const token = process.env.TOKEN;
const port_API = process.env.PORT;
const port_BD = process.env.PORT_BD;
const secretKey = "key";
// Connexion to BDD
const pool = new pg_1.Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    port: port_BD,
});
// ============================ All GET ============================
// GET login
app.get('/login', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("requête passé");
    try {
        const result = yield pool.query('SELECT * FROM "login"');
        console.log(result.rows, "la requête");
        _res.json(result.rows);
    }
    catch (error) {
        console.error('Database query error:', error);
        _res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}));
// GET utilisateur
app.get('/utilisateur', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("requête passé");
    try {
        const result = yield pool.query('SELECT * FROM "utilisateur"');
        console.log(result.rows, "la requête");
        _res.json(result.rows);
    }
    catch (error) {
        console.error('Database query error:', error);
        _res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}));
// GET tache
app.get('/tache', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM "tache"');
        _res.json(result.rows);
    }
    catch (error) {
        console.error('Database query error:', error);
        _res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}));
// GET projet
app.get('/projet', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM "projet"');
        _res.json(result.rows);
    }
    catch (error) {
        console.error('Database query error:', error);
        _res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}));
// GET categorie
app.get('/categorie', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query('SELECT * FROM "categorie"');
        _res.json(result.rows);
    }
    catch (error) {
        console.error('Database query error:', error);
        _res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}));
// GET home
app.get("/", (req, res) => {
    res.send("Bienvenue dans notre premiere API");
});
// ============================ All POST ============================
// POST login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received body:', req.body);
        const { mail, password } = req.body;
        if (!mail || !password) {
            res.status(400).json({ error: "Missing required fields: mail, password" });
            return;
        }
        const query = `INSERT INTO "login" (id, mail, password) VALUES (DEFAULT, $1, $2)`;
        yield pool.query(query, [mail, password]);
        console.log("login inséré avec succès :", { mail, password });
        res.status(201).json({ message: "User created successfully", data: { mail, password } });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
}));
// POST utilisateur
app.post('/utilisateur', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received body:', req.body);
        const { nom, prenom, poste } = req.body;
        if (!nom || !prenom || !poste) {
            res.status(400).json({ error: "Missing required fields: nom, prenom, poste" });
            return;
        }
        const query = `INSERT INTO "utilisateur" (id, nom, prenom, poste) VALUES (DEFAULT, $1, $2, $3)`;
        yield pool.query(query, [nom, prenom, poste]);
        console.log("Utilisateur inséré avec succès :", { nom, prenom, poste });
        res.status(201).json({ message: "User created successfully", data: { nom, prenom, poste } });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
}));
// POST tache
app.post('/tache', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_projet, nom, resume, numberperson, id_utilisateur, status } = req.body;
        console.log(id_projet, nom, resume, numberperson, id_utilisateur, status);
        if (!id_projet || !nom || !resume || !numberperson || !id_utilisateur || !status) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const query = `INSERT INTO "tache" (id, id_projet, nom, resume, numberperson, id_utilisateur, status) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)`;
        yield pool.query(query, [id_projet, nom, resume, numberperson, id_utilisateur, status]);
        console.log("Generated token:", token);
        res.status(201).json({ message: "User created" });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
}));
// POST projet
app.post('/projet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received body:', req.body);
        const { id_categorie, nom, numberperson, id_utilisateur, resume } = req.body;
        if (!id_categorie || !nom || !numberperson || !id_utilisateur || !resume) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const query = `INSERT INTO "projet" (id, id_categorie, nom, numberperson, id_utilisateur, resume) VALUES (DEFAULT, $1, $2, $3, $4, $5)`;
        yield pool.query(query, [id_categorie, nom, numberperson, id_utilisateur, resume]);
        console.log("Generated token:", token);
        res.status(201).json({ message: "User created" });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the projet.' });
    }
}));
// POST categorie
app.post('/categorie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received body:', req.body);
        const { nom, resume } = req.body;
        if (!nom || !resume) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const query = `INSERT INTO "categorie" (id, nom, resume) VALUES (default, $1, $2)`;
        yield pool.query(query, [nom, resume]);
        console.log("Generated token:", token);
        res.status(201).json({ message: "User created" });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
}));
// ============================ UPDATE ============================
// UPDATE utilisateur
app.put('/utilisateur', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, prenom, poste, id } = req.body;
        const query = `UPDATE "utilisateur" SET nom = $1, prenom = $2, poste = $3 WHERE id = $4`;
        yield pool.query(query, [nom, prenom, poste, id]);
        res.json({ message: "User updated successfully" });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
}));
// UPDATE projet
app.put('/projet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_categorie, nom, numberPerson, id_utilisateur, resume, id } = req.body;
        const query = `UPDATE "projet" SET id_categorie = $1, nom = $2, numberPerson = $3, id_utilisateur = $4, resume = $5 WHERE id = $6`;
        yield pool.query(query, [id_categorie, nom, numberPerson, id_utilisateur, resume, id]);
        res.json({ message: "Project updated successfully" });
    }
    catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'An error occurred while updating the project.' });
    }
}));
// UPDATE categorie
app.put('/categorie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, resume, id } = req.body;
        const query = `UPDATE "categorie" SET nom = $1, resume = $2 WHERE id = $3`;
        yield pool.query(query, [nom, resume, id]);
        res.json({ message: "Category updated successfully" });
    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'An error occurred while updating the category.' });
    }
}));
// UPDATE tache
app.put('/tache', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_projet, nom, resume, numberPerson, id_utilisateur, status, id } = req.body;
        const query = `UPDATE "tache" SET id_projet = $1, nom = $2, resume = $3, numberPerson = $4, id_utilisateur = $5, status = $6 WHERE id = $7`;
        yield pool.query(query, [id_projet, nom, resume, numberPerson, id_utilisateur, status, id]);
        res.json({ message: "Task updated successfully" });
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
}));
// ============================ DELETE ============================
// DELETE utilisateur
app.delete('/utilisateur', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const query = `DELETE FROM "utilisateur" WHERE id = $1`;
        yield pool.query(query, [id]);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
}));
// DELETE projet
app.delete('/projet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const query = `DELETE FROM "projet" WHERE id = $1`;
        yield pool.query(query, [id]);
        res.json({ message: "Project deleted successfully" });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'An error occurred while deleting the project.' });
    }
}));
// DELETE categorie
app.delete('/categorie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const query = `DELETE FROM "categorie" WHERE id = $1`;
        yield pool.query(query, [id]);
        res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'An error occurred while deleting the category.' });
    }
}));
// DELETE tache
app.delete('/tache', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const query = `DELETE FROM "tache" WHERE id = $1`;
        yield pool.query(query, [id]);
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'An error occurred while deleting the task.' });
    }
}));
// ============================ OTHER ============================
// app listen
app.listen(port_API, () => {
    console.log(`Notre serveur run en http://localhost:${port_API}`);
});
