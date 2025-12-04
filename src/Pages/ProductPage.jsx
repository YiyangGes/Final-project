import { useParams, useLocation  } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext.jsx";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();  //  read id
  const [product, setProduct] = useState();
  const [mainImage, setMainImage] = useState(null);
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const dataForCart = location.state.product; // a parameter passed from homepage, used for cart function

  console.log(dataForCart)


  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`https://huitian.serv00.net/project/?productId=${id}`);
      const data = await res.json();
      setProduct(data);
      setMainImage(data.imageUrls?.[0] ?? null);
      // console.log(data)
    }
    loadProduct();
  }, [id]);

  const displayedMain = mainImage ?? product?.imageUrls?.[0] ?? null;

  const formatProductId = (id) => {
    if (id === undefined || id === null) return id;
    let s = String(id);
    // replace underscores with spaces
    s = s.replace(/_/g, " ");
    // add space between letters and digits in both directions
    s = s.replace(/([A-Za-z])(\d)/g, "$1 $2").replace(/(\d)([A-Za-z])/g, "$1 $2");
    // collapse multiple spaces and trim
    return s.replace(/\s+/g, " ").trim();
  };

  return (
    <>
      <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
        <div className="product-page-row">
          <div className="thumb-list">
            {(product?.imageUrls ?? []).length > 0 ? (
              product.imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className={`thumb-wrapper ${url === displayedMain ? "selected" : ""}`}
                  onClick={() => setMainImage(url)}
                >
                  <img
                    src={url}
                    alt={`product-thumb-${idx}`}
                  />
                </div>
              ))
            ) : ( <div/>)}
          </div>
          <div className="main-image-container">
            {displayedMain && (
              <img src={displayedMain} alt="product-main" />
            )}
          </div>
        </div>
        <div className="product-description">
          {product ? (
            <>
              {/* {console.log(product)} */}
              <h3>Product ID: {formatProductId(product.productId)}</h3>
              <p><b>Product Price: </b>{product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(dataForCart)}
              >
                Add to Cart
              </button>
              <p><b>Description:</b> {product.shortDescription}</p>
              <p><b>Screen Size:</b> {product.screenSize}</p>
              <p><b>Weight:</b> {product.weight}</p>
              <p><b>Battery Spec:</b> {product.batterySpec}</p>
            </>
          ) : (
            <div/>
          )}
        </div>
      </div>
    </>
  );
};