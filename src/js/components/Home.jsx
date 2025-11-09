import React, { useEffect, useState } from "react";
//import { todoApi } from "../../services/todoApi";
import { createUserTask } from "../../services/todoApi";

const userName = "hugo_guillen";

const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	

	function agregarTarea() {
		setTodos([...todos, inputValue])
		setInputValue("")
	}
	
	function quitarTarea(index) {
		todos.splice(index, 1)
		setTodos([...todos])

		console.log("quiero quitar la tarea:" + (index))
	
	}

	return (
		<div className="container text-center mt-5">
			<h1 className="dispaly-5 fw-ligth text-secondary opacity-75 mb-4">To-Do List</h1>

			<div className="row justify-content-center mb3">
				<div className="col-md-6 col-sm-10">
					<div className="input-group shadow-sm mb-4">
						<input
							type="text"
							className="form-control"
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							placeholder="Cosas pendientes"
						/>
					</div>
						<button className="btn btn-primary px-4" type="button" onClick={async () => {
							agregarTarea();
							await createUserTask(inputValue);
							}}>Agregar tarea</button>
						
				</div>
			</div>
			<ul className="list-group shadow w-50 mx-auto text-start mb-3 p-3">
				{todos.map((todo, index) =>
					<li className="list-group-item d-flex justify-content-between align-items-center" key={todo}>{todo}
						<i
							className="fa-solid fa-trash text-danger"
							role="button"
							onClick={() => quitarTarea(index)}
						></i>
					</li>)}
			</ul>
			<div className="text-muted mt-3 small mb-3">{todos.length} tareas pendientes</div>
		</div>
	);
};

export default Home;