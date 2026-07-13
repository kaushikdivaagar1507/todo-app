import API from "./api/api";
import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await API.get("/tasks");

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

    async function addTask() {
      if (task.trim() === "") return;

      try {
        await API.post("/tasks", {
          text: task,
        });

        setTask("");

        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    }
    async function deleteTask(id) {
      try {
        await API.delete(`/tasks/${id}`);

        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    }
    async function toggleTask(task) {
      try {
        await API.put(`/tasks/${task._id}`, {
          text: task.text,
          completed: !task.completed,
        });

        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    }
    async function editTask(task) {
      const newText = prompt("Edit task:", task.text);

      if (newText === null) return;

      if (newText.trim() === "") return;

      try {
        await API.put(`/tasks/${task._id}`, {
          text: newText,
          completed: task.completed,
        });

        fetchTasks();
      } catch (error) {
        console.error(error);
      }
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
          onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
        />

        <button onClick={addTask}>
          Add
        </button>

      </div>

      {tasks.length === 0 ? (
        <p className="empty-message">
          📝 No tasks yet. Add your first task!
        </p>
      ) : (
        tasks.map((item) => (
          <Todo
            key={item._id}
            task={item}
            onDelete={() => deleteTask(item._id)}
            onToggle={() => toggleTask(item)}
            onEdit={() => editTask(item)}
          />
        ))
      )}

    </div>
  );
}

export default App;