import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RemoteApp from "./components/RemoteApp.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// "auth/mount" = <nom du remote>/<module exposé> (voir vite.config.js)
const loadAuth = () => import("auth/mount");

export default function App() {
  const navigate = useNavigate();

  const authMfe = (view) => (
    <RemoteApp load={loadAuth} props={{ view, navigate }} />
  );

  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={authMfe("login")} />
          <Route path="/register" element={authMfe("register")} />
          <Route
            path="/profile"
            element={<ProtectedRoute>{authMfe("profile")}</ProtectedRoute>}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>Page introuvable.</p>} />
        </Routes>
      </main>
    </>
  );
}
