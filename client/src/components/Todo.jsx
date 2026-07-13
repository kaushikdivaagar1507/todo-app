function Todo({ task, onDelete, onToggle , onEdit }) {
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
      />

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>

      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Todo;