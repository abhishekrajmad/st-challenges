import { useCart } from "./CartContext";

function CartHeader() {
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <h2>Shopping Cart</h2>

      <div>
        Cart
        <span>{totalItems}</span>
      </div>
    </header>
  );
}

export default CartHeader;
