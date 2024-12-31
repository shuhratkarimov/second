import { useEffect, useState } from "react";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from 'react-toastify';
import './index.css';

function App() {
  const [items, setItems] = useState([]);
  const [exec, setExec] = useState("");
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const getData = () => {
    fetch("http://localhost:3000/get")
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = editId
      ? `http://localhost:3000/update/${editId}`
      : `http://localhost:3000/add`;
    let requestMethod = editId ? "PUT" : "POST";

    fetch(url, {
      method: requestMethod,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        exec,
        todo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message), setExec("");
        setTodo("");
        getData();
      })
      .catch((error) => console.log(error));
  };

  const deleteData = (id) => {
    fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data), getData();
      })
      .catch((error) => console.log(error));
  };

  const register = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    fetch(`http://localhost:3000/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        setExec(username);
        setUsername(""); 
        setEmail("");
        setPassword("");
        setRole("");
      })
      .catch((error) => console.log(error));
  };
  

  useEffect(() => {
    getData();
  }, [handleSubmit]);

  const handleEdit = (item) => {
    setEditId(item.id);
    setTodo(item.todo);
    setExec(item.exec);
  };

  return (
    <>
    <ToastContainer/>
      <div className="hero">
        <div className="register">
        <form onSubmit={register}>
        <input
          type="text"
          placeholder="username"
          required
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
                <input
          type="password"
          placeholder="password"
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                <input
          type="text"
          placeholder="role"
          required
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
        <button className="sign" type="submit">Sign up</button>
      </form>
        </div>
      <div className="send">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="exec"
          required
          name="exec"
          value={exec}
          onChange={(e) => setExec(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="todo"
          required
          name="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <br />
        <button className="add" type="submit">{editId ? "update data" : "add data"}</button>
      </form>
    <div className = "info">
    <ul>
        {items.length ? (
          items.map((item, idx) => (
            <li key={idx}>
              <span>{item.exec}</span>: <span>{item.todo}</span>
              <div><button className="edit" onClick={() => handleEdit(item)}>edit</button>
              <button className="delete" onClick={() => deleteData(item.id)}>delete</button></div>
            </li>
          ))
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </ul>
    </div>
      </div>
      </div>
    </>
  );
}

export default App;
