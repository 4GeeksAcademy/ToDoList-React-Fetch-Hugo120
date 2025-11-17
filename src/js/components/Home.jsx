import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { useFormState } from "react-dom";

const Home = () => {
  const [tarea, setTarea] = useState("");
  const[todo, setTodo] = useState([]);
  const username = "hugo_guillen";

  useEffect(() => {

	fetch(`https://playground.4geeks.com/todo/users/${username}`,{
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
  })
  	.then(resp => {
		console.log("Usuario creado correctamente", resp.ok);
		console.log("Status: ", resp.status);
		return resp.json();		
	})
	.catch(error => console.log("Error al crear usuario:", error));
	
	recuperarTodo()
	}, []);

	const recuperarTodo = async() => {
		return fetch(`https://playground.4geeks.com/todo/users/${username}`)
		.then(resp =>{
			console.log("Recuperar ToDo: ", resp.ok);
			console.log("Status: ", resp.status)
			return resp.json();
		})
		.then(data => {
			console.log("Tarea recuperada: ", data.todos);
			setTodo(data.todos);
		})
		.catch(error => console.log("Error al recuperar ToDo:", error));
	};

	const agregarTarea = async () => {
		await fetch(`https://playgrounds.4geeks.com/todo/users/${username}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"label": tarea
		})
	})
		.then(() => {
			recuperarTodo();
		}).then(resp => {
			console.log("Tarea agregada correctamente", resp.ok);
			console.log("Status: ", resp.status);
			return resp.json();
		})
		.catch(console.log("Error al agregar tarea:"));
	}
	
	const eliminarTarea = async (id) => {
		await fetch(`https://playground.4geeks.com/todo/${username}/${id}`, {
			method: "DELETE",
		})
		.then(resp => {
			console.log(`Eliminar tarea ${todo_id}: `, resp.ok)
			console.log("Status: ", resp.status);
			return resp.json();
		})
		.catch(error => console.log(`Error al eliminar tarea ${id}`, error));

		await recuperarTodo();
		};
	const BorrarTodo = async () => {
		for (const tarea of todo){
			await eliminarTarea(tarea.id);
		}
		traerTodo();
	};
	
	return (
        <div className="container">
            <h1>todos</h1>

            <div className="caja">
                <input
                    onChange={(event) => setTarea(event.target.value)}
                    onKeyDown={(event) => {
						if (event.key === "Enter" && tarea.trim() !== "") {
							setTodo([...todo, { label: tarea }]);
                            setTarea("");
                            agregarTarea()
                        }
                    }}
                    
                    value={tarea}
					placeholder="Ingresa tu tarea"
                />

                <ul className="listas">
                    {todo?.length === 0 ? (
                        <li>No hay tareas, añade una</li>
                    ) : null}

                    {todo?.map((item,) => (
                        <li key={item.id}>
                            {item.label} {" "}

                            <i onClick={async () => {
                                await eliminarTarea(item.id);
                                traerTodo();
                            }}>
                                <FontAwesomeIcon icon={faTrash} /> </i>
                        </li>
                    ))}
                </ul>

                <div className="contador">{todo.length} tarea menos</div>
                <div className="botonContenedor">
                    <button onClick={BorrarTodo} className="borrarTodo">
                        Borrar todo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;