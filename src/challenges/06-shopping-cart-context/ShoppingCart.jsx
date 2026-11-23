import { CartProvider } from "./CartContext";
import CartHeader from "./CartHeader";
import ProductGrid from "./ProductGrid";
import CartPanel from "./CartPanel";
import "./ShoppingCart.css";

function ShoppingCart() {
  return (
    <CartProvider>
      <div className="shopping-cart">
        <CartHeader />

        <main>
          <ProductGrid />
          <CartPanel />
        </main>
      </div>
    </CartProvider>
  );
}

export default ShoppingCart;