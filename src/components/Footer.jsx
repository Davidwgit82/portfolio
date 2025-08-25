import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const Year = new Date().getFullYear();
  return (
    <>
      <p className={`${styles.footer} mb-0`}>{Year}/ David.</p>
    </>
  );
};

export default Footer;
