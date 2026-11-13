
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";
import ProductFilterSort from "./challenges/01-product-filter-sort/ProductFilterSort";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/challenges/product-filter-sort"
        element={<ProductFilterSort />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
