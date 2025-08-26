import React, { useState, useEffect } from "react";
import styles from "./Projets.module.css";
import { FaHourglassHalf } from "react-icons/fa";

const BadgeEnCours = () => (
  <span className={styles.badgeEnCours}>
    <FaHourglassHalf className={styles.badgeIcon} />
    En cours
  </span>
);

const Projets = () => {
  const [selectedTab, setSelectedTab] = useState("realises");
  const [projets, setProjets] = useState([]); // <-- Déclarez l'état pour les projets
  const [loading, setLoading] = useState(true); // <-- Ajoutez un état de chargement
  const [error, setError] = useState(null); // <-- Ajoutez un état d'erreur

  // Fonction pour récupérer les projets depuis l'API
  const fetchProjets = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/projets");
      if (!response.ok) {
        throw new Error("Échec du chargement des projets.");
      }
      const data = await response.json();
      setProjets(data); // <-- Mettez à jour l'état avec les données de l'API
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // <-- Terminez le chargement
    }
  };

  // Exécutez la récupération des projets au montage du composant
  useEffect(() => {
    fetchProjets();
  }, []); // Le tableau vide [] assure que l'effet ne s'exécute qu'une seule fois

  // Filtrer les projets en fonction de l'onglet sélectionné
  const filteredProjets = projets.filter(
    // <-- Utilisez la variable d'état `projets`
    (porto) =>
      (selectedTab === "realises" && !porto.enCours) ||
      (selectedTab === "enCours" && porto.enCours)
  );

  // Gérer les états de chargement et d'erreur
  if (loading) {
    return <p>Chargement des projets...</p>;
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  return (
    <section className="container my-5" id="projets">
      <h3 className="text-center mb-4">Projets</h3>
      <div className={`border rounded p-3 ${styles.bown}`}>
        {/* Onglets */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${
                selectedTab === "realises" ? "active text-dark" : "text-dark"
              }`}
              href="#!"
              onClick={() => setSelectedTab("realises")}
            >
              Réalisés
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                selectedTab === "enCours"
                  ? "active text-success"
                  : "text-success"
              }`}
              href="#!"
              onClick={() => setSelectedTab("enCours")}
            >
              En cours...
            </a>
          </li>
        </ul>
        {/* Liste des projets filtrés */}
        <div className="row g-4 mt-3">
          {filteredProjets.length > 0 ? (
            filteredProjets.map((porto) => (
              <div key={porto.id} className="col-12 col-md-6">
                <div className="d-flex flex-column flex-md-row border rounded p-3 h-100 gap-3">
                  {/* Image avec badge conditionnel */}
                  <div className={styles.imageContainer}>
                    <img
                      src={`http://localhost:3001${porto.image}`}
                      alt={porto.titre}
                      className={`${styles.images} rounded`}
                    />
                    {porto.enCours && <BadgeEnCours />}
                  </div>
                  {/* Contenu */}
                  <div className="d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <h4>{porto.titre}</h4>
                      <hr className="my-2" />
                      <p>{porto.description}</p>
                      <hr className="my-2" />
                    </div>
                    {/* Bouton */}
                    <div>
                      <a
                        href={porto.link}
                        className={styles.animatedBtn}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Voir le code source de ${porto.titre}`}
                      >
                        <span className={styles.aLink}>Source</span>
                        <svg
                          className={styles.btnIcon}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          width="16"
                          height="16"
                          aria-hidden="true"
                        >
                          <path
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            fill="currentColor"
                          />
                          <path
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100 small">
              Il n'y a rien comme <b>projets réalisés ou en cours</b> pour
              l'instant, je vous
              <a
                href="https://wa.me/2250779336916"
                className="mx-1 text-success"
              >
                attends.
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projets;
