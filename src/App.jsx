import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([
    "Learn React",
    "Learn Node",
    "Learn MongoDB"
  ]);

  function addTask() {

    if (task.trim() === "") return;

    setTasks([...tasks, task]);

    setTask("");
  }

  return (
    <div className="container">

      <h1>📝 My ToDo List</h1>

      <div className="input-area">

        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>
          Add
        </button>

      </div>

      {tasks.map((item, index) => (
        <Todo
          key={index}
          task={item}
        />
      ))}

    </div>
  );
}

export default App;