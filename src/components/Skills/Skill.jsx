import React from "react";
import { skillsData } from "../../data/SkillData";
import styles from "./Skill.module.css";

const Skill = () => {
  return (
    <section className="container py-5 mt-4" id="competences">
      <h3 className="text-center mb-3">Compétences</h3>
      <p className="text-center text-muted mb-4">
        Langages, frameworks, librairies.
      </p>

      {/* Responsive grid au lieu de flex-wrap */}
      <div className={`row g-3 ${styles.skillis}`}>
        {skillsData.map((skillData) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={skillData.id}>
            <div className="d-flex flex-column align-items-center border rounded p-3 h-100">
              <img
                src={skillData.image}
                alt={skillData.name}
                className={`${styles.images} img-fluid mb-2`}
                width="80"
              />
              <span className="text-center">{skillData.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skill;
