import { useReducer, useState, useEffect } from "react";
import { todoReducer, init, STORAGE_KEY } from "./todoReducer";
import "./PersistentTodo.css";

export default function PersistentTodo() {
  const [todos, dispatch] = useReducer(todoReducer, [], init);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("ALL"); // "ALL" | "ACTIVE" | "COMPLETED"

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmed,
      done: false,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD", todo: newTodo });
    setInputText("");
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      dispatch({ type: "EDIT", id, text: editText });
    }
    setEditingId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ACTIVE") return !todo.done;
    if (filter === "COMPLETED") return todo.done;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.done).length;
  const hasCompleted = todos.some((todo) => todo.done);

  return (
    <div className="todo-container">
      <h2 className="todo-title">Todo List</h2>

      <form className="todo-form" onSubmit={handleAddSubmit}>
        <input
          type="text"
          className="todo-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a task.."
        />
        <button
          type="submit"
          className="todo-add-btn"
          disabled={!inputText.trim()}
        >
          Add
        </button>
      </form>

      <div className="todo-controls">
        <span className="todo-count">
          {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
        </span>

        <div className="todo-filters">
          {["ALL", "ACTIVE", "COMPLETED"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`filter-btn ${filter === tab ? "active" : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {hasCompleted && (
          <button
            type="button"
            className="clear-done-btn"
            onClick={() => dispatch({ type: "CLEAR_DONE" })}
          >
            Clear done
          </button>
        )}
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-state">
            {todos.length === 0
              ? "No tasks here. Add your first task!"
              : "No tasks found here!"}
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.done ? "completed" : ""}`}
            >
              {editingId === todo.id ? (
                <div className="todo-edit-group">
                  <input
                    type="text"
                    className="todo-edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditSave(todo.id);
                      if (e.key === "Escape") handleEditCancel();
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="save-btn"
                    onClick={() => handleEditSave(todo.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <label className="todo-label">
                    <input
                      type="checkbox"
                      className="todo-checkbox"
                      checked={todo.done}
                      onChange={() => dispatch({ type: "TOGGLE", id: todo.id })}
                    />
                    <span
                      className="todo-text"
                      onDoubleClick={() => startEditing(todo)}
                      title="Double-click to edit"
                    >
                      {todo.text}
                    </span>
                  </label>

                  <div className="todo-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => startEditing(todo)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => dispatch({ type: "DELETE", id: todo.id })}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
