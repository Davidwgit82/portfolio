import React, { useState, useRef } from "react";
import "./Header.module.css";
import Bouton from "./Bouton/Bouton";
import cls from "./Bouton/Bouton.module.css";
import { Toast, ToastContainer } from "react-bootstrap";

const Header = () => {
  const formRef = useRef();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    const form = formRef.current;
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      setShowToast(true);
      // form reset(), reinitialisation du formulaire
    }
    form.classList.add("was-validated");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container align-items-center">
          {/* Brand */}
          <a className="navbar-brand fw-bold" href="/">
            IDAVID
          </a>

          {/* Toggler avec Heroicons */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* Heroicons two-bars */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="28"
              height="28"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>

          {/* Liens navbar */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row flex-wrap gap-2 mx-auto text-center">
              <li className="nav-item">
                <a className="nav-link" href="#competences">
                  Compétences
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projets">
                  Projets
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">&times;</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/certificats"
                  target="_blank"
                  rel="noopener"
                >
                  Certificats
                </a>
              </li>
            </ul>

            {/* Bouton contact */}
            <div className="ms-lg-auto mt-3 mt-lg-0">
              <Bouton>
                <a
                  className={`btn border-bottom rounded-0 ${cls.contactBtn}`}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasContact"
                  aria-controls="offcanvasContact"
                >
                  Appelez-moi
                </a>
              </Bouton>
            </div>
          </div>
        </div>
      </nav>

      {/* off canvas contacts */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasContact"
        aria-labelledby="offcanvasContactLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasContactLabel">
            Dites-moi,
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Fermer"
          ></button>
        </div>

        <div className="offcanvas-body">
          <p>Tout à travers ce formulaire ou contactez-moi.</p>

          {/* Formulaire simple de contact */}
          <form
            className="needs-validation"
            noValidate
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="david@gmail.blonde"
                required
              />
              <label htmlFor="floatingInput">
                Courriel <em className="text-warning">*</em>
              </label>
              <div className="invalid-feedback">
                Entrez une adresse valide. @gmail/yahoo/fr etc.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Votre message
              </label>
              <textarea
                placeholder="quelques lignes si vous voulez..."
                className="form-control"
                id="message"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`${cls.btnsub} btn btn-dark rounded-0 w-50`}
            >
              Envoyer
            </button>{" "}
            <hr />
            <span className="small"> Ou par téléphone/WhatsApp </span>
            <div className="container row g-4">
              <p className="border col-md-6 p-1 text-center">TEL/ 0788729838</p>{" "}
              <p className="border col-md-6 p-1 text-center">
                {" "}
                <a
                  className="mt-0 text-decoration-none"
                  href="https://wa.me/2250779336916"
                >
                  0779336916
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg="success"
        >
          <Toast.Body closeButton={true} className="text-white">
            Bien reçu. Vous serez contacté dans un instant...
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Header;
