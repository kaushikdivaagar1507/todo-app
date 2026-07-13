function Todo({ task }) {
  return (
    <div className="todo">
      <input type="checkbox" />

      <span>{task}</span>

      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default Todo;