export const STORAGE_KEY = "persistent_todos_v1";

export function init(initialState) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return initialState;

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : initialState;
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return initialState;
  }
}

export function todoReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const trimmed = action.todo.text.trim();

      if (!trimmed) return state;

      return [{ ...action.todo, text: trimmed }, ...state];
    }

    case "TOGGLE": {
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
    }

    case "DELETE": {
      return state.filter((todo) => todo.id !== action.id);
    }

    case "EDIT": {
      const trimmed = action.text.trim();

      if (!trimmed) return state;

      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: trimmed } : todo,
      );
    }

    case "CLEAR_DONE": {
      return state.filter((todo) => !todo.done);
    }

    default:
      return state;
  }
}
