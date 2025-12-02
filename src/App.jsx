import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  Outlet,
} from "react-router-dom";

import HomePage from "./Pages/HomePage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import CheckoutPage from "./Pages/CheckoutPage.jsx";
import TermsPage from "./Pages/TermsPage.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import CartProvider, { CartContext } from "./Pages/CartContext.jsx"; // Note: CartContext is now imported as a named export

// ------------------ Layout ------------------
const MainWrapper = () => {
  // 1. Get cart data from context
  const { cart } = useContext(CartContext);
  
  // 2. Calculate the total number of items (sum of quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        background: "#f9f9f9",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          margin: "0 auto",
        }}
      >
        {/* Navbar */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 20px",
            background: "#e0e0e0ff",
            // borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#007bff" }}>MyShop</div>

          <div>
            {["/", "/cart", "/checkout"].map((path, idx) => {
              const isCartPath = path === "/cart";
              
              const label =
                path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2);

              return (
                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  style={({ isActive }) => ({
                    marginRight: idx < 2 ? "15px" : "0",
                    textDecoration: "none",
                    color: isActive ? "#007bff" : "#333",
                    fontWeight: isActive ? "bold" : "normal",
                    // Use flex to keep link text and badge aligned horizontally
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  })}
                >
                  {label}
                  
                  {/* 3. Cart Badge UI */}
                  {isCartPath && totalItems > 0 && (
                    <span
                      style={{
                        backgroundColor: '#dc3545', // Red background for visibility
                        color: 'white',
                        borderRadius: '9999px', // Fully rounded for a circle/pill shape
                        padding: '2px 7px',
                        fontSize: '12px',
                        fontWeight: '600',
                        minWidth: '24px',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        marginLeft: '4px',
                        transform: 'translateY(-1px)' // Small adjustment to center it vertically better
                      }}
                    >
                      {totalItems}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <main style={{ flex: 1 }}>
          <Outlet />
        </main>

        {/* Footer */}
        <footer
          style={{
            padding: "12px 0",
            background: "#dbd9d9ff",
            textAlign: "center",
            color: "#2f2f2fff",
            fontSize: "14px",
            // borderRadius: "8px",
            marginTop: "32px",
          }}
        >
          © 2025 MyShop •{" "}
          <NavLink to="/terms" style={{ textDecoration: "none", color: "#007bff" }}>
            Terms & Conditions
          </NavLink>
        </footer>
      </div>
    </div>
  );
};

// ------------------ Router ------------------
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainWrapper />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "cart", element: <CartPage /> },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "terms", element: <TermsPage /> },
        { path: "product/:id", element: <ProductPage /> },
      ],
    },
  ],
  { basename: "/Final-project" }
);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
