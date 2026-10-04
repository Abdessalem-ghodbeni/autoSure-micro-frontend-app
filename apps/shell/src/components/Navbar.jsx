import { Link, useNavigate } from "react-router-dom";
import { endSession } from "@autosure/shared";
import { useAuth } from "../hooks/useAuth.js";

export default function Navbar() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    endSession();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <strong>AutoSure</strong>
      <nav>
        {token ? (
          <>
            <Link to="/dashboard">Tableau de bord</Link>
            <Link to="/profile">Profil</Link>
            <span>{user?.email}</span>
            <as-button variant="secondary" onClick={handleLogout}>
              Déconnexion
            </as-button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </nav>
    </header>
  );
}
