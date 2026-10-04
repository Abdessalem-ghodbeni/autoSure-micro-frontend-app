import { useAuth } from "../hooks/useAuth.js";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <section>
      <h2>Bienvenue {user?.email}</h2>
      <p>
        Le tableau de bord deviendra un micro frontend dans une prochaine
        partie.
      </p>
    </section>
  );
}
