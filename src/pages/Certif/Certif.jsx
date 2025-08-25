import React from "react";
import styles from "./Certif.module.css";
import Navbar from "../../components/Navbar";

const Certif = () => {
  return (
    <>
      <Navbar />
      <div className={`${styles.container}`}>
        <h2 className="text-center"> Toutes mes certifs seront ici. </h2>
      </div>
    </>
  );
};

export default Certif;
