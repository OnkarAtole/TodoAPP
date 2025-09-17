import React, { useState } from "react";
import API from "../api.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!form.email || !form.password) return setError("Email and password required");
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/todos");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <div className="error">{error}</div>}
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p style={{ marginTop: 12 }}>No account? <a href="/register">Register</a></p>
    </div>
  );
}
