import React, { useState, useEffect } from 'react'; // Ajout de useEffect
import { useNavigate } from 'react-router-dom';
import Register from './register';


function Login() {
  const [formData, setFormData] = useState({ mail: '', password: '' });
  const [users, setUsers] = useState([]); // Utilisateurs récupérés depuis l'API
  const navigate = useNavigate();

  // Récupérer les utilisateurs au premier rendu
  useEffect(() => {
    fetch("http://localhost:3005/login")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Erreur lors de la récupération des utilisateurs :", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedUser = users.find(
      user => user.mail === formData.mail && user.password === formData.password
    );
    if (matchedUser) {
      // Rediriger vers la page des projets avec l'utilisateur connecté
      navigate('/dashboard', { state: { user: matchedUser, id: formData.id_utilisateur } });
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <>
      <h1>Welcome !</h1>
      <h2>Connectez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mail :</label>
          <input
            type="text"
            name="mail"
            value={formData.mail}
            onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <button type="submit">Connexion</button>
      </form>
      <h2>Enregistrez-vous</h2>
      <Register />
    </>
  );
}

export default Login;
