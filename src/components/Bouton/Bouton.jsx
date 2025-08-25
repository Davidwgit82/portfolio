import React from "react";
import cls from "./Bouton.module.css";

const Bouton = ({ children }) => {
  return (
    <>
      <button className={`${cls.bouton} btn p-2 pb-2`}>{children}</button>
    </>
  );
};

export default Bouton;
