import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const Year = new Date().getFullYear();
  return (
    <>
      <div className="container d-flex align-items-center gap-2">
        <p className={`${styles.footer} mb-0 small`}>{Year} / David.</p>
        <a href="/admin" className="text-dark small text-underline">
          {" "}
          L'administrateur
        </a>
      </div>
    </>
  );
};

export default Footer;
