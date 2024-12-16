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
dotenv_1.default.config();
const app = (0, express_1.default)();
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
// POST utilisateur
app.post('/utilisateur', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received body:', req.body);
        const { nom, prenom, poste } = req.body;
        if (!nom || !prenom || !poste) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const query = `INSERT INTO "utilisateur" (nom, prenom, poste) VALUES ($1, $2, $3)`;
        yield pool.query(query, [nom, prenom, poste]);
        console.log("Generated token:", token);
        res.status(201).json({ message: "User created" });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
}));
// POST tache
app.post('/tache', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received body:', req.body);
        const { id_projet, nom, resume, numberperson, id_utilisateur, status } = req.body;
        if (!id_projet || !nom || !resume || !numberperson || !id_utilisateur || !status) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        const query = `INSERT INTO "tache" (id_projet, nom, resume, numberperson, id_utilisateur, status) VALUES ($1, $2, $3, $4, $5, $6)`;
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
        const query = `INSERT INTO "tache" (id_categorie, nom, numberperson, id_utilisateur, resume) VALUES ($1, $2, $3, $4, $5)`;
        yield pool.query(query, [id_categorie, nom, numberperson, id_utilisateur, resume]);
        console.log("Generated token:", token);
        res.status(201).json({ message: "User created" });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
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
        const query = `INSERT INTO "categorie" (nom, resume) VALUES ($1, $2)`;
        yield pool.query(query, [nom, resume]);
        console.log("Generated token:", token);
        res.status(201).json({ message: "User created" });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
}));
// ============================ OTHER ============================
// app listen
app.listen(port_API, () => {
    console.log(`Notre serveur run en http://localhost:${port_API}`);
});
