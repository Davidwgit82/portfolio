import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import form from "./Login.module.css";

const Login = () => {

  useEffect(() => {
    document.title = "Se logger/Admin"
  })

  const [formData, setFormData] = useState({
    codePin: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook pour la redirection

  // Gère les changements dans les champs de saisie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // En cas de succès, stocker le token d'authentification
        localStorage.setItem("authToken", data.token);

        // Alerte utilisateur (optionnel, peut être remplacé par un message toast)
        alert(data.message);

        // Rediriger vers la page d'administration
        navigate("/admin");
      } else {
        // En cas d'échec, afficher l'erreur
        alert(data.error);
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div
      className={`${form.div} container ms-auto mt-4 w-50 border py-4 rounded`}
    >
      <h4 className="pb-2"> Login admin </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="codePin" className="form-label">
            CODE PIN
          </label>
          <input
            id="codePin"
            type="number"
            name="codePin"
            className="form-control rounded-0 p-2"
            placeholder="CODE PIN / 4 chiffres"
            value={formData.codePin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control rounded-0 p-2"
            placeholder="Entrez votre mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className={`${form.btnForm} btn btn-primary rounded-0 w-100 p-2`}
        >
          Accéder
        </button>
      </form>
    </div>
  );
};

export default Login;
