import { products } from "../01-product-filter-sort/products";
import { useCart } from "./CartContext";

function ProductGrid() {
  const { addItem } = useCart();

  return (
    <section className="product-grid">
      {products.map((product) => (
        // <div key={product.id} className="product-card">
        //   <h3>{product.name}</h3>

        //   <p>{product.category}</p>

        //   <p>₹{product.price}</p>

        //   <p>⭐ {product.rating}</p>

        //   <button type="button" onClick={() => addItem(product)}>
        //     Add to Cart
        //   </button>
        // </div>
        <div className="product-card">
          <div className="product-info-row">
            <h3>{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
          </div>
          <div className="product-info-row">
            <p className="product-category">{product.category}</p>
            <p className="product-rating">⭐ {product.rating}</p>
          </div>

          

          <button type="button" onClick={() => addItem(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </section>
  );
}

export default ProductGrid;
