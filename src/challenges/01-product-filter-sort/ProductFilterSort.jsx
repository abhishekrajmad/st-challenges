import { useState } from "react";
import { products } from "./products";
import "./ProductFilterSort.css";

function ProductFilterSort() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory),
  );
  const categories = ["All", ...new Set(products.map((item) => item.category))];
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "rating-desc":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });

  const averagePrice = sortedProducts.length
    ? sortedProducts.reduce((total, product) => total + product.price, 0) /
      sortedProducts.length
    : 0;

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("default");
  };

  return (
    <div className="product-page">
      <h1>Product Filter & Sort</h1>
      <div className="search-row">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>

      <button onClick={handleClearFilters}>Clear Filters</button> */}

      <div className="filters-row">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>

        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>

      <p>
        Showing {sortedProducts.length} of {products.length} products
      </p>
      <p>Average price: ₹{averagePrice.toLocaleString("en-IN")}</p>

      {sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p className="product-category">{product.category}</p>

              <div className="product-meta">
                <h4>₹{product.price.toLocaleString("en-IN")}</h4>
                <p>★ {product.rating}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found. Try changing your filters.</p>
      )}
    </div>
  );
}

export default ProductFilterSort;
