import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main
        style={{
          flex: 1, // flex: 1 tout l espace de haut/bas/droite/gauche
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
