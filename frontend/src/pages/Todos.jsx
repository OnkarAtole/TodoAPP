import React, { useEffect, useState } from "react";
import API from "../api.jsx";
import { useNavigate } from "react-router-dom";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const { data } = await API.get("/todos");
      setTodos(data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else setError("Could not load todos");
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async () => {
    if (!text) return setError("Todo text needed");
    try {
      await API.post("/todos", { text });
      setText("");
      fetchTodos();
    } catch (err) {
      setError(err.response?.data?.msg || "Could not add todo");
    }
  };

  const toggleTodo = async (id) => {
    try {
      await API.put(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      setError("Could not update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      setError("Could not delete todo");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header-row">
        <h1>My Todos</h1>
        <div>
          <button className="btn-ghost" onClick={fetchTodos}>Refresh</button>
          <button className="btn-ghost" style={{ marginLeft: 8 }} onClick={logout}>Logout</button>
        </div>
      </div>

      <div>
        <input placeholder="New todo..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn-primary" style={{ marginLeft: 8 }} onClick={addTodo}>Add</button>
        {error && <div className="error">{error}</div>}
      </div>

      <ul className="todo-list" style={{ marginTop: 16 }}>
        {todos.map((t) => (
          <li key={t._id} className="todo-item">
            <span
              className={`todo-text ${t.completed ? "completed" : ""}`}
              onClick={() => toggleTodo(t._id)}
              title="Toggle complete"
            >
              {t.text}
            </span>
            <div>
              <button className="btn-ghost" onClick={() => deleteTodo(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
