import React, { useEffect, useState } from 'react';

function Listprojet({ userId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3005/projet")
      .then(response => response.json())
      .then(data => {
        const userProjects = data.filter(project => project.id_utilisateur === userId);
        setProjects(userProjects);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des projets :", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (projects.length === 0) {
    return <p>Aucun projet trouvé pour cet utilisateur.</p>;
  }

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.nom}</h3>
          <p>Résumé : {project.resume}</p>
          <p>Participants : {project.numberperson}</p>
        </div>
      ))}
    </div>
  );
}

export default Listprojet;
