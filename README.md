# Project Management Web App
Develop a project management web app using React (frontend), Node.js (backend), PostgreSQL (database), and TypeScript. Features include CRUD operations for projects and categories, plus filtering projects by category.

# Fonctionnalité de l'application web
## 1. Gestion de Projets
permet aux utilisateurs de gérer des projets. Chaque projet peut être associé à une ou plusieurs catégories.
### 1.1 Catégories
plusieurs catégories pour gestion de projet
### 1.2 Planifier les tâches

### 1.3 Planning

### 1.4 flux de travail

# Base de donnée
## User
clé primaire id
nom: text
prenom: text
poste: text

CREATE TABLE utilisateur (
    id SERIAL primary key,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    poste VARCHAR(255)
);


## Projet
cle primaire id de projet
clé etranger id categorie
nom : text
nombre de personne : int
    clé étranger id user
résumé du projet : text

CREATE TABLE projet (
    id SERIAL primary key,
    id_categorie integer references categorie(id),
    nom VARCHAR(255),
    numberPerson integer,
    id_utilisateur integer references utilisateur(id),
    resume VARCHAR(255)
);

## categorie 
clé primaire id
nom : text
résumé : text

CREATE TABLE categorie (
    id SERIAL primary key,
    nom VARCHAR(255),
    résumé VARCHAR(255)
);

## tache
id 
clé étranger: id projet
nom : text
résumé : text
nombre de personne : int
    clé étranger id user
status: enum (To do / Doing / Done)

CREATE TABLE tache (
    id SERIAL primary key,
    id_projet integer references projet(id),
    nom VARCHAR(255),
    resume VARCHAR(255),
    numberPerson integer,
    id_utilisateur integer references utilisateur(id),
    status status_type
);

## TYPE

CREATE TYPE status_type AS ENUM('ToDo', 'Doing', 'Done');
