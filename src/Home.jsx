import React, { useEffect } from "react";
import Hero from "./components/Hero/Hero";
import Skill from "./components/Skills/Skill";
import Projets from "./components/Projets/Projets";

// styles css
import cls from "./Home.module.css";
import Header from "./components/Header";
const Home = () => {
  useEffect(() => {
    document.title = "Accueil";
  });
  return (
    <div className={`${cls.appContain}`}>
      <main>
        <Hero />
        <Skill />
        <Projets />
      </main>
    </div>
  );
};

export default Home;
