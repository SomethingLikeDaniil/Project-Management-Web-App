import React, { useState } from 'react';

const Register = () => {
  const [userFormData, setUserFormData] = useState({ nom: '', prenom: '', poste: '' });
  const [loginFormData, setLoginFormData] = useState({ mail: '', password: '', id_utilisateur: '' });
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3005/utilisateur', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Utilisateur créé :', data);
        // Pré-remplir le champ id_utilisateur dans le formulaire de login
        setLoginFormData((prevData) => ({ ...prevData, id_utilisateur: data.id }));
        setIsUserCreated(true);
        // Réinitialiser le formulaire utilisateur
        setUserFormData({ nom: '', prenom: '', poste: '' });
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login créé :', data);
        // Réinitialiser le formulaire de login
        setLoginFormData({ mail: '', password: '', id_utilisateur: '' });
        setIsUserCreated(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la création du login :', error);
      });
  };

  return (
    <>
      <h3>Créez votre utilisateur</h3>
      <form onSubmit={handleUserSubmit}>
        <div>
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={userFormData.nom}
            onChange={handleUserChange}
            required
          />
        </div>
        <div>
          <label htmlFor="prenom">Prénom :</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={userFormData.prenom}
            onChange={handleUserChange}
            required
          />
        </div>
        <div>
          <label htmlFor="poste">Poste :</label>
          <input
            type="text"
            id="poste"
            name="poste"
            value={userFormData.poste}
            onChange={handleUserChange}
            required
          />
        </div>
        <button type="submit">Créer l'utilisateur</button>
      </form>

      {isUserCreated && (
        <>
          <h3>Créez votre login</h3>
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="mail">Mail :</label>
              <input
                type="email"
                id="mail"
                name="mail"
                value={loginFormData.mail}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            {/* Champ id_utilisateur masqué */}
            <input
              type="hidden"
              name="id_utilisateur"
              value={loginFormData.id_utilisateur}
            />
            <button type="submit">Créer le login</button>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
