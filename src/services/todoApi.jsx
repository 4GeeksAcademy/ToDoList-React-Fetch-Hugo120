
export const createUserTask = async (newTask) => {
  const response = await fetch(
    "https://playground.4geeks.com/todo/todos/hugo_guillen",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        label: newTask,
        is_done: false
      })

    }
  );
  if (response.ok) {
    const data = await response.json();
    console.log("esta es la data" + data);
    return data;
  } else {
    const message = { error: response.statusText };
    console.log(message);
  }
};


/*export const llamarFuncionFetch = async () => {
  const response = await fetch(
    ''URL",
    {method: "",headers: {},body{} });

    const data = await response.json();
    return data;

};*/
