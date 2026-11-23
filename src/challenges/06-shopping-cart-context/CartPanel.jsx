import { useState } from "react";
import { useCart } from "./CartContext";

function CartPanel() {
  const { items, removeItem, updateQty, clearCart } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SAVE10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon");
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;
  const gst = discountedSubtotal * 0.18;
  const grandTotal = discountedSubtotal + gst;

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <aside className="cart-panel">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>

                  <p>
                    {currencyFormatter.format(item.price)} × {item.quantity}
                  </p>

                  <p>
                    Line Total:{" "}
                    {currencyFormatter.format(item.price * item.quantity)}
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    disabled={item.quantity >= 10}
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button type="button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCouponApplied(false);
                setCouponError("");
              }}
            />

            <button type="button" onClick={handleApplyCoupon}>
              Apply Coupon
            </button>

            {couponError && <p className="coupon-error">{couponError}</p>}

            {couponApplied && (
              <p className="coupon-success">Coupon applied successfully!</p>
            )}
          </div>

          <div className="cart-summary">
            <p>
              <strong>Subtotal:</strong> {currencyFormatter.format(subtotal)}
            </p>

            {couponApplied && (
              <p>
                <strong>Discount (10%):</strong> -
                {currencyFormatter.format(discount)}
              </p>
            )}

            <p>
              <strong>GST (18%):</strong> {currencyFormatter.format(gst)}
            </p>

            <p>
              <strong>Grand Total:</strong>{" "}
              {currencyFormatter.format(grandTotal)}
            </p>
          </div>

          <button type="button" onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </aside>
  );
}

export default CartPanel;
