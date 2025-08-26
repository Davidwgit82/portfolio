import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const emptyProjet = {
  titre: "",
  description: "",
  imageFile: null,
  link: "",
  enCours: false,
};

const AdminPage = () => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(emptyProjet);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate(); // Initialize the hook

  // --- Logic pour la deconnexion ---
  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem("authToken");
    // Redirect the user to the login page
    navigate("/connexion-admin");
  };

  // --- Logic for Authentication and Data Fetching ---
  const fetchProjets = async () => {
    // Check for a valid token before fetching data
    const token = localStorage.getItem("authToken");
    if (!token) {
      // If no token, redirect to login and stop
      navigate("/connexion-admin");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/projets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle server response errors
      if (res.status === 401 || res.status === 403) {
        throw new Error("Unauthorized or Forbidden access.");
      }
      const data = await res.json();
      setProjets(data);
    } catch (e) {
      console.error(e);
      setError("Les projets n'ont pas pu être chargés.");
      if (
        e.message.includes("Unauthorized") ||
        e.message.includes("Forbidden")
      ) {
        navigate("/connexion-admin");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Tableau de bord";
    fetchProjets();
  }, [navigate]); // Add `Maps` to the dependency array

  // --- Form and CRUD Operations ---
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    // Special handling for the file input
    if (type === "file") {
      setForm((f) => ({ ...f, [name]: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Authentification requise.");
      navigate("/connexion-admin");
      return;
    }
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:3001/api/projets/${editingId}`
        : "http://localhost:3001/api/projets";

      const formData = new FormData();
      formData.append("titre", form.titre);
      formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append("enCours", form.enCours);
      if (form.imageFile) {
        formData.append("imageFile", form.imageFile);
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur serveur");

      setForm(emptyProjet);
      setEditingId(null);
      fetchProjets();
    } catch {
      alert("Erreur lors de la sauvegarde");
    }
  };

  const handleEdit = (projet) => {
    setForm({
      titre: projet.titre,
      description: projet.description,
      imageFile: null,
      link: projet.link,
      enCours: projet.enCours,
    });
    setEditingId(projet.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Authentification requise.");
      navigate("/connexion-admin");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3001/api/projets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      });
      if (!res.ok) throw new Error("Erreur serveur");
      fetchProjets();
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  // --- Component JSX with Logout Button ---
  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin — Gestion Projets</h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Déconnexion
        </button>
      </div>

      {/* ... (rest of the form and project list) ... */}
      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded">
        <h4>{editingId ? "Modifier un projet" : "Ajouter un projet"}</h4>
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="titre"
            className="form-control"
            value={form.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            name="imageFile"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lien source</label>
          <input
            type="text"
            name="link"
            className="form-control"
            value={form.link}
            onChange={handleChange}
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="enCours"
            id="enCours"
            className="form-check-input"
            checked={form.enCours}
            onChange={handleChange}
          />
          <label htmlFor="enCours" className="form-check-label">
            En cours ?
          </label>
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {editingId ? "Modifier" : "Ajouter"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setForm(emptyProjet);
              setEditingId(null);
            }}
          >
            Annuler
          </button>
        )}
      </form>
      <ul className="list-group">
        {projets.map((projet) => (
          <li
            key={projet.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{projet.titre}</strong>
              {projet.enCours && (
                <span className="badge bg-warning text-dark ms-2">
                  En cours
                </span>
              )}
            </div>
            <div>
              <button
                className="btn btn-sm btn-info me-2"
                onClick={() => handleEdit(projet)}
              >
                Modifier
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(projet.id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
