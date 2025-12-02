import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    console.log("Adding item to cart:", item); // Debug: see what's being added
    
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      
      // Try to parse the price from different possible formats
      let parsedPrice = 0;
      if (typeof item.price === 'number') {
        parsedPrice = item.price;
      } else if (typeof item.price === 'string') {
        // Remove $ or other currency symbols and parse
        parsedPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      }
      
      console.log("Parsed price:", parsedPrice); // Debug: see parsed price
      
      return [...prev, { 
        ...item, 
        price: isNaN(parsedPrice) ? 0 : parsedPrice, 
        qty: 1 
      }];
    });
  };

  const updateQty = (productId, newQty) => {
    if (newQty === 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.productId === productId ? { ...item, qty: newQty } : item))
      );
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;