import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaClock,
} from "react-icons/fa";

function Todo({
  task,
  onDelete,
  onToggle,
  onEdit,
}) {

  // Priority settings
  const priorityInfo = {
    high: {
      label: "🔴 High Priority",
      className: "high",
    },

    medium: {
      label: "🟡 Medium Priority",
      className: "medium",
    },

    low: {
      label: "🟢 Low Priority",
      className: "low",
    },
  };

  // Old tasks may not have priority
  const currentPriority =
    priorityInfo[task.priority] || priorityInfo.medium;


  // Format date
  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "";


  return (
    <div
      className={`todo-item ${
        task.completed ? "completed" : ""
      }`}
    >

      {/* Checkbox */}
      <button
        className={`todo-checkbox ${
          task.completed ? "checked" : ""
        }`}
        onClick={onToggle}
      >
        {task.completed && <FaCheck />}
      </button>


      {/* Task content */}
      <div className="todo-content">

        {/* Task text */}
        <p
          className={`task-text ${
            task.completed ? "done" : ""
          }`}
        >
          {task.text}
        </p>


        {/* Priority */}
        <span
          className={`priority-badge ${currentPriority.className}`}
        >
          {currentPriority.label}
        </span>


        {/* Date */}
        <div className="task-date">

          <FaClock />

          <span>
            {formattedDate}
          </span>

        </div>

      </div>


      {/* Buttons */}
      <div className="todo-actions">

        <button
          className="edit-button"
          onClick={onEdit}
        >
          <FaEdit />
          Edit
        </button>


        <button
          className="delete-button"
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