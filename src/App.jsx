import React from "react";
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from "react-router-dom";
import { HomePage, CheckoutPage, CartPage, TermsPage, ErrorPage } from "./Pages";

// ----- Main Layout -----
const MainWrapper = () => (
  <div style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    background: "#f9f9f9",
  }}>
    <div style={{
      width: "900px",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      margin: "0 auto",
    }}>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#e0e0e0ff",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <div style={{ fontWeight: "bold", color: "#007bff" }}>MyShop</div>
        <div>
          {["/", "/card", "/checkout"].map((path, idx) => {
            const label = path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                style={({ isActive }) => ({
                  marginRight: idx < 2 ? "15px" : "0",
                  textDecoration: "none",
                  color: isActive ? "#007bff" : "#333",
                  fontWeight: isActive ? "bold" : "normal"
                })}
              >
                {label}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{
        padding: "12px 0",
        background: "#dbd9d9ff",
        textAlign: "center",
        color: "#2f2f2fff",
        fontSize: "14px",
        borderRadius: "8px",
        marginTop: "20px"
      }}>
        © 2025 MyShop • <NavLink to="/terms" style={{ textDecoration: "none", color: "#007bff" }}>Terms & Conditions</NavLink>
      </footer>
    </div>
  </div>
);

// ----- Router Setup -----
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainWrapper />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "card", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "terms", element: <TermsPage /> },
    ],
  },
],
{
   basename: "/Final-project",
}
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;