# Database Schema Documentation

This document provides an overview of the database schema, detailing the structure and relationships of the tables within the system.

## Tables Overview

The database consists of the following tables:

1. **login**: Manages user authentication details.
2. **utilisateur**: Stores user personal information.
3. **projet**: Contains project-related data.
4. **categorie**: Defines project categories.
5. **tache**: Tracks tasks associated with projects.

## Table Definitions

### login

This table stores user authentication details.

```sql
CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    mail VARCHAR(255),
    password VARCHAR(255),
    id_utilisateur INTEGER REFERENCES utilisateur(id)
);
```

- `id`: Unique identifier for each login record.
- `mail`: User's email address.
- `password`: User's password.
- `id_utilisateur`: Foreign key referencing the `id` in the `utilisateur` table.

### utilisateur

This table stores user personal information.

```sql
CREATE TABLE utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    poste VARCHAR(255)
);
```

- `id`: Unique identifier for each user.
- `nom`: User's last name.
- `prenom`: User's first name.
- `poste`: User's position or role.

### projet

This table contains project-related data.

```sql
CREATE TABLE projet (
    id SERIAL PRIMARY KEY,
    id_categorie INTEGER REFERENCES categorie(id),
    nom VARCHAR(255),
    numberPerson INTEGER,
    id_utilisateur INTEGER REFERENCES utilisateur(id),
    resume VARCHAR(255)
);
```

- `id`: Unique identifier for each project.
- `id_categorie`: Foreign key referencing the `id` in the `categorie` table.
- `nom`: Name of the project.
- `numberPerson`: Number of people involved in the project.
- `id_utilisateur`: Foreign key referencing the `id` in the `utilisateur` table.
- `resume`: Brief description of the project.

### categorie

This table defines project categories.

```sql
CREATE TABLE categorie (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    resume VARCHAR(255)
);
```

- `id`: Unique identifier for each category.
- `nom`: Name of the category.
- `resume`: Brief description of the category.

### tache

This table tracks tasks associated with projects.

```sql
CREATE TABLE tache (
    id SERIAL PRIMARY KEY,
    id_projet INTEGER REFERENCES projet(id),
    nom VARCHAR(255),
    resume VARCHAR(255),
    numberPerson INTEGER,
    id_utilisateur INTEGER REFERENCES utilisateur(id),
    status status_type
);
```

- `id`: Unique identifier for each task.
- `id_projet`: Foreign key referencing the `id` in the `projet` table.
- `nom`: Name of the task.
- `resume`: Brief description of the task.
- `numberPerson`: Number of people assigned to the task.
- `id_utilisateur`: Foreign key referencing the `id` in the `utilisateur` table.
- `status`: Current status of the task, defined by the `status_type` enum.

### status_type Enum

Defines the possible statuses for tasks.

```sql
CREATE TYPE status_type AS ENUM('ToDo', 'Doing', 'Done');
```

- `ToDo`: Task has not been started.
- `Doing`: Task is in progress.
- `Done`: Task has been completed.

## Relationships

- The `login` table is linked to the `utilisateur` table via the `id_utilisateur` foreign key.
- The `projet` table is associated with the `categorie` table through the `id_categorie` foreign key and with the `utilisateur` table via the `id_utilisateur` foreign key.
- The `tache` table is connected to the `projet` table through the `id_projet` foreign key and to the `utilisateur` table via the `id_utilisateur` foreign key.

This schema is designed to efficiently manage user authentication, personal information, project details, categories, and associated tasks within the system. 