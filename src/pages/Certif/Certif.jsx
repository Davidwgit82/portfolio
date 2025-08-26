import React, { useEffect } from "react";
import styles from "./Certif.module.css";
import svg from "../../assets/graduate.svg";
// data
import { CertifData } from "../../data/CertifData";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Certif = () => {

  useEffect(() => {
    document.title = "Certifications  "
  })

  return (
    <div className="container py-4">
      <div
        className={`${styles.hero} d-flex flex-md-row justify-content-center align-items-center gap-4`}
      >
        <h3 className="text-center">Certificats</h3>
        <img
          style={{ objectFit: "cover" }}
          className="img-fluid"
          width="380"
          src={svg}
          alt="graduate"
        />
      </div>

      {/* certif */}
      <div
        style={{ marginTop: "100px" }}
        className="container py-3 border rounded"
      >
        <ul className="list-group">
          {CertifData.map((certif, index) => (
            <li key={index} className="list-group-item">
              <span className="text-warning">{certif.titre}</span> / <span>{certif.date}</span> –{" "}
              <a className={`${styles.certifLink} text-decoration-none small`} href={certif.lien} target="_blank" rel="noopener noreferrer">
                voir la certif
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Certif;
