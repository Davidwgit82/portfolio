// import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Certif from "./pages/Certif/Certif";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificats" element={<Certif />} />
      </Routes>
    </>
  );
}

export default App;
