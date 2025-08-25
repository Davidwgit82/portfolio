import React from "react";
import { portof } from "../../data/projets";
import styles from "./Projets.module.css";

const Projets = () => {
  return (
    <section className="container my-5" id="projets">
      <h3 className="text-center mb-4">Projets</h3>

      <div className={`border rounded p-3 ${styles.bown}`}>
        {/* Onglets */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active text-dark"
              aria-current="page"
              href="#"
            >
              Réalisés
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-success" href="#">
              En cours...
            </a>
          </li>
        </ul>

        {/* Liste des projets */}
        <div className="row g-4 mt-3">
          {portof.map((porto) => (
            <div key={porto.id} className="col-12 col-md-6">
              <div className="d-flex flex-column flex-sm-row border rounded p-3 h-100 gap-3">
                {/* Image uniformisée */}
                <img
                  src={porto.image}
                  alt={porto.titre}
                  className={`${styles.images} object-fit-cover`}
                  style={{
                    width: "250px",
                    height: "180px",
                    borderRadius: "0",
                  }}
                />

                {/* Contenu */}
                <div className="flex-grow-1 d-flex flex-column">
                  <h4>{porto.titre}</h4>
                  <hr className="my-2" />
                  <p className="flex-grow-1">{porto.description}</p>
                  <hr className="my-2" />

                  {/* Bouton laissé tel quel */}
                  <div>
                    <button className={`${styles.animatedBtn}`} type="button">
                      <span className={`${styles.aLink}`}>source</span>
                      <a href={porto.link} className={`${styles.btnIcon}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            fill="#fefdf5"
                          ></path>
                          <path
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            fill="#fefdf5"
                          ></path>
                        </svg>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projets;
