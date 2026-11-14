import { useEffect, useState } from "react";
import "./DebouncedUserSearch.css";

const cache = new Map();

function DebouncedUserSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setUsers([]);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      if (cache.has(trimmedQuery.toLowerCase())) {
        setUsers(cache.get(trimmedQuery.toLowerCase()));
        setLoading(false);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://dummyjson.com/users/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();

        cache.set(trimmedQuery.toLowerCase(), data.users);
        setUsers(data.users);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Something went wrong. Please try again.");
          setUsers([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function highlightName(name) {
    const index = name.toLowerCase().indexOf(query.trim().toLowerCase());

    if (!query.trim() || index === -1) {
      return name;
    }

    const match = name.slice(index, index + query.trim().length);

    return (
      <>
        {name.slice(0, index)}
        <strong>{match}</strong>
        {name.slice(index + match.length)}
      </>
    );
  }

  return (
    <div className="user-search-page">
      <h1>Debounced User Search</h1>
      <p>Search users by their first or last name.</p>

      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {!query.trim() && <p>Type to search</p>}

      {loading && <p>Loading...</p>}

      {error && <p className="search-error">{error}</p>}

      {!loading && !error && query.trim() && users.length === 0 && (
        <p>No users found.</p>
      )}

      <div className="users-grid">
        {users.map((user) => {
          const fullName = `${user.firstName} ${user.lastName}`;

          return (
            <div className="user-card" key={user.id}>
              <h3>{highlightName(fullName)}</h3>
              <p>{user.email}</p>
              <p>{user.address.city}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DebouncedUserSearch;
