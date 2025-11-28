const HomePage = () => {
    // Product data
const products = [
  { id: 1, name: "iPhone 17", price: 1400 },
  { id: 2, name: "iPhone 16", price: 1200 },
  { id: 3, name: "iPhone 15", price: 1000 },
  { id: 4, name: "Samsung Galaxy S25", price: 800 },
  { id: 5, name: "Samsung Galaxy S24", price: 600 },
  { id: 6, name: "Samsung Galaxy S23", price: 400 },
];
  return (
    <>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Product List</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ marginBottom: "10px" }}>{product.name}</h3>
            <p style={{ marginBottom: "10px", color: "#555" }}>${product.price}</p>
            <button
              style={{
                padding: "8px 12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};


export default HomePage;