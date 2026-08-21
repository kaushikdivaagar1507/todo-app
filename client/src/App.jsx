import { useEffect, useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Todo from "./components/Todo";
import API from "./api/api";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  function handleLogin(userData) {
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  }

  // Signup page
  if (!user && showSignup) {
    return (
      <Signup
        goToLogin={() => setShowSignup(false)}
      />
    );
  }

  // Login page
  if (!user) {
    return (
      <Login
        onLogin={handleLogin}
        goToSignup={() => setShowSignup(true)}
      />
    );
  }

  // Profile page
  if (user && showProfile) {
    return (
      <Profile
        user={user}
        goBack={() => setShowProfile(false)}
      />
    );
  }

  // Todo page
  return (
    <TodoApp
      user={user}
      logout={logout}
      openProfile={() => setShowProfile(true)}
    />
  );
}


function TodoApp({ user, logout, openProfile }) {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [priority, setPriority] = useState("medium");


  // ========================================
  // FILTER TASKS
  // ========================================

  const filteredTasks = tasks.filter((item) => {

    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? !item.completed
          : item.completed;

    return matchesSearch && matchesFilter;
  });


  // ========================================
  // FETCH TASKS
  // ========================================

  useEffect(() => {
    fetchTasks();
  }, []);


  async function fetchTasks() {

    try {

      const response = await API.get("/");

      setTasks(response.data);

    } catch (error) {

      console.error(error);

      if (error.response?.status === 401) {
        logout();
      }
    }
  }


  // ========================================
  // ADD TASK
  // ========================================

  async function addTask() {

    if (task.trim() === "") return;

    try {

      await API.post("/", {
        text: task,
        priority: priority,
      });

      setTask("");

      setPriority("medium");

      fetchTasks();

    } catch (error) {

      console.error("Add task error:", error);
    }
  }


  // ========================================
  // DELETE TASK
  // ========================================

  async function deleteTask(id) {

    try {

      await API.delete(`/${id}`);

      fetchTasks();

    } catch (error) {

      console.error("Delete task error:", error);
    }
  }


  // ========================================
  // TOGGLE TASK
  // ========================================

  async function toggleTask(task) {

    try {

      await API.put(`/${task._id}`, {

        text: task.text,

        completed: !task.completed,

        priority: task.priority || "medium",

      });

      fetchTasks();

    } catch (error) {

      console.error("Toggle task error:", error);
    }
  }


  // ========================================
  // EDIT TASK
  // ========================================

  async function editTask(task) {

    const newText = prompt(
      "Edit task:",
      task.text
    );

    if (newText === null) return;

    if (newText.trim() === "") return;

    try {

      await API.put(`/${task._id}`, {

        text: newText,

        completed: task.completed,

        priority: task.priority || "medium",

      });

      fetchTasks();

    } catch (error) {

      console.error("Edit task error:", error);
    }
  }


  // ========================================
  // UI
  // ========================================

  return (
    <div className="container">

      {/* ================================
          TOP BAR
      ================================= */}

      <div className="top-bar">

        <div>

          <h1>📝 My ToDo List</h1>

          <p>
            Welcome, {user.name} 👋
          </p>

        </div>


        <div className="user-actions">

          <button
            className="profile-button"
            onClick={openProfile}
          >
            👤 Profile
          </button>


          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* ================================
          ADD TASK
      ================================= */}

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


        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="priority-select"
        >

          <option value="high">
            🔴 High
          </option>

          <option value="medium">
            🟡 Medium
          </option>

          <option value="low">
            🟢 Low
          </option>

        </select>


        <button onClick={addTask}>
          Add
        </button>

      </div>


      {/* ================================
          SEARCH
      ================================= */}

      <div className="search-area">

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* ================================
          FILTER BUTTONS
      ================================= */}

      <div className="filter-area">

        <button
          className={
            filter === "all"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => setFilter("all")}
        >
          All
        </button>


        <button
          className={
            filter === "active"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => setFilter("active")}
        >
          Active
        </button>


        <button
          className={
            filter === "completed"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() =>
            setFilter("completed")
          }
        >
          Completed
        </button>

      </div>


      {/* ================================
          TASK COUNT
      ================================= */}

      <div className="task-count">

        {filteredTasks.length}{" "}

        {filteredTasks.length === 1
          ? "task"
          : "tasks"}

      </div>


      {/* ================================
          TASK LIST
      ================================= */}

      {filteredTasks.length === 0 ? (

        <p className="empty-message">

          {search
            ? "🔍 No tasks found."
            : "📝 No tasks yet. Add your first task!"
          }

        </p>

      ) : (

        filteredTasks.map((item) => (

          <Todo
            key={item._id}
            task={item}

            onDelete={() =>
              deleteTask(item._id)
            }

            onToggle={() =>
              toggleTask(item)
            }

            onEdit={() =>
              editTask(item)
            }
          />

        ))

      )}

    </div>
  );
}

export default App;