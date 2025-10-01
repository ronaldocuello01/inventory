import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { fetchLogin } from "../features/users/usersSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loggedUser, loading, error } = useAppSelector((state: { users: any; }) => state.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password }));
    setEmail("");
    setPassword("");
  };

  if (loggedUser && loggedUser != undefined) {
    console.log(`logged: ${JSON.stringify(loggedUser)}`);
    
    return <p>Ya estás logueado como <strong>{loggedUser.name}</strong>.</p>;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
