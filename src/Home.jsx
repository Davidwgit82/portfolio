import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import Skill from "./components/Skills/Skill";
import Projets from "./components/Projets/Projets";
import Footer from "./components/Footer";

// styles css
import cls from "./Home.module.css";
const Home = () => {
  return (
    <div className={`${cls.appContain}`}>
      <Navbar />
      <main>
        <Hero />
        <Skill />
        <Projets />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
