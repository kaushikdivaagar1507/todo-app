import API from "./api/api";
import { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Get all tasks
  async function fetchTasks() {
    try {
      const response = await API.get("/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  // Add task
  async function addTask() {
    if (task.trim() === "") return;

    try {
      await API.post("/", {
        text: task,
      });

      setTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // Delete task
  async function deleteTask(id) {
    try {
      await API.delete(`/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Toggle task
  async function toggleTask(task) {
    try {
      await API.put(`/${task._id}`, {
        text: task.text,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  // Edit task
  async function editTask(task) {
    const newText = prompt("Edit task:", task.text);

    if (newText === null || newText.trim() === "") return;

    try {
      await API.put(`/${task._id}`, {
        text: newText,
        completed: task.completed,
      });

      fetchTasks();
    } catch (error) {
      console.error("Error editing task:", error);
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

        <button onClick={addTask}>Add</button>
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