import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [tarea, setTarea] = useState("");
  const [todo, setTodo] = useState([]);
  const username = "hugo_guillen";

  useEffect(() => {
    fetch(`https://playground.4geeks.com/todo/users/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log("Usuario creado correctamente", resp.ok);
        return resp.json();
      })
      .catch((error) => console.log("Error al crear usuario:", error));

    recuperarTodo();
  }, []);

  const recuperarTodo = async () => {
    return fetch(`https://playground.4geeks.com/todo/users/${username}`)
      .then((resp) => {
        console.log("Recuperar ToDo: ", resp.ok);
        console.log("Status: ", resp.status);
        return resp.json();
      })
      .then((data) => {
        console.log("Tarea recuperada: ", data.todos);
        setTodo(data.todos);
      })
      .catch((error) => console.log("Error al recuperar ToDo:", error));
  };

  const agregarTarea = async () => {
    await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: tarea,
        is_done: false,
      }),
    })
      .then((resp) => {
        console.log("Tarea agregada correctamente", resp.ok);
        console.log("Status: ", resp.status);
        return resp.json();
      })
      .catch((error) => console.log("Error al agregar tarea:", error));

    recuperarTodo();
    setTarea("");
  };

  const eliminarTarea = async (id) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        console.log(`Eliminar tarea ${id}: `, resp.ok);
        console.log("Status: ", resp.status);
        return resp.json();
      })
      .catch((error) => console.log(`Error al eliminar tarea ${id}`, error));

    recuperarTodo();
  };

  const BorrarTodo = async () => {
    for (const tarea of todo) {
      await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
        method: "DELETE",
      });
    }
    recuperarTodo();
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="container d-flex flex-column align-items-center">
        <h1 className="text-center display-1 fw-light mb-4 text-primary">
          To - Do List
        </h1>

        <div className="card shadow-lg p-3" style={{ width: "28rem" }}>
          <input
            className="form-control form-control-lg mb-3"
            placeholder="Escribe tu tarea aquí"
            onChange={(event) => setTarea(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && tarea.trim() !== "") {
                agregarTarea();
              }
            }}
            value={tarea}
          />

          <ul className="list-group">
            {todo.length === 0 && (
              <li className="list-group-item text-muted">
                Esperando Tarea...
              </li>
            )}

            {todo.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.label}
                <span
                  role="button"
                  onClick={() => eliminarTarea(item.id)}
                  className="text-danger"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </li>
            ))}
          </ul>

          <div className="text-muted mt-2">
            {todo.length} tareas pendientes
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button onClick={BorrarTodo} className="btn btn-success">
              Borrar todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;