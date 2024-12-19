import React, { useEffect, useState } from 'react';

function ListCategorie({ userId }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3005/categorie")
      .then(response => response.json())
      .then(data => {
        const userCategories = data; // Filtrage si nécessaire
        setCategories(userCategories);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories :", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (categories.length === 0) {
    return <p>Aucune catégorie trouvée.</p>;
  }

  return (
    <div>
      {categories.map(categorie => (
        <div key={categorie.id}>
          <h3>{categorie.nom}</h3>
          <p>Résumé : {categorie.resume}</p>
        </div>
      ))}
    </div>
  );
}

export default ListCategorie;
