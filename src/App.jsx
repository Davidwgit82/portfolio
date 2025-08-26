// import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Certif from "./pages/Certif/Certif";
import Layout from "./Layout";
import AdminPage from "./admin/AdminTdb";
import Login from "./admin/auth/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/certificats" element={<Certif />} />
          <Route path="/connexion-admin" element={<Login />} /> 
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
