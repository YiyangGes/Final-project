import React, { useContext } from "react";
import { CartContext } from "../CartContext.jsx";

const CartItem = ({ productId, price, imageUrl, qty }) => {
  const { updateQty } = useContext(CartContext);

  const increase = () => updateQty(productId, qty + 1);
  const decrease = () => updateQty(productId, qty - 1);
  const remove = () => updateQty(productId, 0);

  const buttonStyle = {
    padding: "8px 16px",
    border: "1px solid #007bff",
    background: "#fff",
    color: "#007bff",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.2s ease",
  };

  const deleteButtonStyle = {
    padding: "8px 16px",
    border: "1px solid #dc3545",
    background: "#fff",
    color: "#dc3545",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "20px 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <img
        src={imageUrl}
        alt={`Product ${productId}`}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
          marginRight: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "auto",
        }}
      >
        <p style={{ margin: "0 0 4px 0" }}>
          <strong>Product ID:</strong> {productId}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Price:</strong> ${price}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <button
          onClick={decrease}
          disabled={qty === 1}
          onMouseDown={(e) => {
            if (qty > 1) {
              e.currentTarget.style.background = "#007bff";
              e.currentTarget.style.color = "#fff";
            }
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#007bff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#007bff";
          }}
          style={{
            ...buttonStyle,
            opacity: qty === 1 ? 0.5 : 1,
            cursor: qty === 1 ? "not-allowed" : "pointer",
          }}
        >
          -
        </button>
        <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px", minWidth: "30px", textAlign: "center" }}>
          {qty}
        </p>
        <button
          onClick={increase}
          onMouseDown={(e) => {
            e.currentTarget.style.background = "#007bff";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#007bff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#007bff";
          }}
          style={buttonStyle}
        >
          +
        </button>
        <p
          style={{
            margin: 0,
            fontWeight: "bold",
            fontSize: "20px",
            minWidth: "80px",
            textAlign: "center",
          }}
        >
          ${(qty * price)}
        </p>
        <button
          onClick={remove}
          onMouseDown={(e) => {
            e.currentTarget.style.background = "#dc3545";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#dc3545";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#dc3545";
          }}
          style={deleteButtonStyle}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;