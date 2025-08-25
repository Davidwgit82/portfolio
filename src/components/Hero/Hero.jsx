import React from "react";
import styles from "./Hero.module.css";
import svg from "../../assets/codingJob.svg";
const Hero = () => {
  return (
    <div className="container py-5" id="moi">
      <h3 className={`mb-4 fs-2 fw-bold border-bottom pb-2 w-50`}>
        Un peu sur moi
      </h3>

      <div className={`row align-items-center ${styles.textImg}`}>
        {/* Texte */}
        <div className="col-md-6 mb-4 mb-md-0">
          <p className={`fs-5 lh-lg`}>
            Développeur passionné. Créateur d'appli web/mobile/bureautique
            adaptées à vos besoins. Concrétisons vos projets ensemble.
          </p>
        </div>

        {/* Image */}
        <div className="col-md-6 text-center">
          <img
            src={svg}
            alt="coding"
            className={`img-fluid ${styles.heroImg}`}
            style={{ maxWidth: "70%", transition: "transform 0.3s ease" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
