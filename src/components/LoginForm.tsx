import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { fetchLogin } from "../features/users/usersSlice";
import './styles/LoginForm.css';

interface LoginFormProps {
    // Podrías pasar el estado 'loading' y 'error' como props si prefieres
}

export default function LoginForm({}: LoginFormProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: { users: any; }) => state.users);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password }));
  };

  return (
    <div className="login-form-card">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}