import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";
import CartItem from "./Components/CartItem.jsx";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

      <h1 style={{ margin: "0 0 30px 0", textAlign: "left" }}>Your Shopping Cart</h1>

      <div>
        {cart.map((item) => (
          <CartItem
            key={item.productId}
            productId={item.productId}
            price={item.price}
            imageUrl={item.imageUrl}
            qty={item.qty}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "30px",
          paddingTop: "20px",
          borderTop: "2px solid #ddd",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 15px 0" }}>
            Total: ${total}
          </p>
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "12px 30px",
                cursor: "pointer",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Check Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;