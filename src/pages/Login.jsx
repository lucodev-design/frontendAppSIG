import { useState } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");       // input de correo
  const [password, setPassword] = useState(""); // input de contraseña
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // limpiar errores previos

    try {
      // OJO: el backend espera 'correo', no 'email'
      const res = await api.post("/auth/login", {  email, password });

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login exitoso ✅");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error en login:", err.response?.data || err.message);
      setError(
        err.response?.data?.error || "Ocurrió un error al iniciar sesión ❌"
      );
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <h2>Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
