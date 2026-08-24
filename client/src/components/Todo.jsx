import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

function Todo({
  task,
  onDelete,
  onToggle,
  onEdit,
}) {

  // ========================================
  // PRIORITY
  // ========================================

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

  const currentPriority =
    priorityInfo[task.priority] ||
    priorityInfo.medium;


  // ========================================
  // CREATED DATE
  // ========================================

  const formattedCreatedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "";


  // ========================================
  // DUE DATE
  // ========================================

  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : null;


  return (
    <div
      className={`todo-item ${
        task.completed ? "completed" : ""
      }`}
    >

      {/* ========================================
          CHECKBOX
      ======================================== */}

      <button
        className={`todo-checkbox ${
          task.completed ? "checked" : ""
        }`}
        onClick={onToggle}
      >
        {task.completed && <FaCheck />}
      </button>


      {/* ========================================
          TASK CONTENT
      ======================================== */}

      <div className="todo-content">

        {/* Task name */}

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


        {/* ========================================
            DUE DATE
        ======================================== */}

        {formattedDueDate && (
          <div className="due-date-display">

            <FaCalendarAlt />

            <span>
              Due: {formattedDueDate}
            </span>

          </div>
        )}


        {/* ========================================
            CREATED DATE
        ======================================== */}

        <div className="task-date">

          <FaClock />

          <span>
            {formattedCreatedDate}
          </span>

        </div>

      </div>


      {/* ========================================
          ACTION BUTTONS
      ======================================== */}

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