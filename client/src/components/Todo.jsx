import { FaPen, FaTrash, FaClock } from "react-icons/fa";

function Todo({ task, onDelete, onToggle, onEdit }) {

  const formattedDate = new Date(task.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className={`todo-item ${task.completed ? "completed" : ""}`}>

      {/* Left side */}
      <div className="todo-left">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="todo-checkbox"
        />

        <div className="todo-content">

          <p className={`task-text ${task.completed ? "done" : ""}`}>
            {task.text}
          </p>

          <span className="task-date">
            <FaClock />
            {formattedDate}
          </span>

        </div>

      </div>

      {/* Right side */}
      <div className="todo-actions">

        <button
          className="edit-btn"
          onClick={onEdit}
        >
          <FaPen />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
}

export default Todo;