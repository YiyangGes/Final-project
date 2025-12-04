import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext.jsx";
import { Link } from "react-router-dom";

const BASE_URL = "https://huitian.serv00.net/project/?type=list&batchNumber=";

async function fetchBatch(batchNumber) {
  const res = await fetch(BASE_URL + batchNumber);
  if (!res.ok) throw new Error("Failed to load products (batch " + batchNumber + ")");
  return res.json();
}

const HomePage = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]); // for store the fetched data
  const [hasMore, setHasMore] = useState(true);
  const [nextBatch, setNextBatch] = useState(3); // 1 & 2 is already loaded when initializing

  useEffect(() => {
    async function loadProducts() {
      try {

        const [batch1, batch2] = await Promise.all([
          fetchBatch(1),
          fetchBatch(2),
        ]);

        console.log("Batch 1:", batch1); // Debug: check API structure
        console.log("First product:", batch1.products[0]); // Debug: see product structure


        const initialProducts = [...batch1.products, ...batch2.products];
        setProducts(initialProducts);

      } catch (err) {
        console.log("something went wrong")
      }
    }

    loadProducts();
  }, []);

  async function handleLoadMore() {
    try {
      const batch = await fetchBatch(nextBatch);
      setProducts((prev) => [...prev, ...batch.products]);
      setNextBatch((prev) => prev + 1);
      setHasMore(batch.moreProducts);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Product List</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          margin:"0 48px 32px 48px"
        }}
      >
        {products.map((product) => (
          <div
            key={product.productId}
            style={{
              // border: "1px solid #e8e5e5ff",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
              backgroundColor: "#fff",
              height:"300px"
            }}
          >
            <Link to={`/product/${product.productId}`} state={{ product }}>
              <img 
                height="60%" 
                src= {product.imageUrl}
                style={{ cursor: "pointer" }}
              />
            </Link>

            <h3>{product.productId}</h3>
            <p>{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              style={{
                padding: "8px 36px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                transition: "transform 0.1s",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* configure load more function, one of the image link is not valid */}
      {hasMore && (
        <button
          onClick={() => handleLoadMore()}
          style={{
            padding: "8px 36px",
            border: "1px solid #007bff",
            borderRadius: "6px",
            backgroundColor: "rgb(249, 249, 249)",
            color: "#007bff",
            cursor: "pointer",
            margin:"0 auto",
            display: "block",
            transition: "transform 0.1s",
            boxShadow: "1px 1px 5px rgba(0,0,0,0.08)",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
        Load More Products
      </button>
      )}
    </>
  );
};

export default HomePage;