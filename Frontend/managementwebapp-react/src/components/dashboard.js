import React from 'react';
import Listprojet from './listprojet';
import Listcategorie from './listcategorie';
import Listtache from './listtache';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const user = location.state?.user; // Récupérer les données de l'utilisateur

  if (!user) {
    return <p>Accès refusé : Aucun utilisateur connecté.</p>;
  }

  return (
    <>
      <div>
        <h1>Bonjour, {user.mail} ! Ravi de vous revoir.</h1>
      </div>
      <h2>Vos Tâches :</h2>
      <Listtache userId={user.id_utilisateur} />
      <h2>Vos Projets :</h2>
      <Listprojet userId={user.id_utilisateur} />
      <h2>Vos Catégorie :</h2>
      <Listcategorie/>
    </>
  );
}

export default Dashboard;
