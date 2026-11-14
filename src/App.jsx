
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";
import ProductFilterSort from "./challenges/01-product-filter-sort/ProductFilterSort";
import DebouncedUserSearch from "./challenges/02-debounced-user-search/DebouncedUserSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/challenges/product-filter-sort"
        element={<ProductFilterSort />}
      />

      <Route
        path="/challenges/debounced-user-search"
        element={<DebouncedUserSearch />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
