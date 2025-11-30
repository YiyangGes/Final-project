import { useContext, useState } from "react";
import { CartContext } from "./CartContext.jsx";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    sameAsBilling: false,
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let formattedValue = value;
    
    if (name === "cardNumber") {
      // Remove non-digits and limit to 16
      formattedValue = value.replace(/\D/g, "").slice(0, 16);
    } else if (name === "expiryDate") {
      // Format as MM/YY
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
    } else if (name === "cvv") {
      // Only digits, max 3
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    } else if (name === "mobile") {
      // Only digits, max 10
      formattedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "billingZip" || name === "shippingZip") {
      // Only digits, max 5
      formattedValue = value.replace(/\D/g, "").slice(0, 5);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : formattedValue,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    if (name === "sameAsBilling" && checked) {
      setFormData((prev) => ({
        ...prev,
        sameAsBilling: true,
        shippingStreet: prev.billingStreet,
        shippingCity: prev.billingCity,
        shippingState: prev.billingState,
        shippingZip: prev.billingZip,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Personal Information
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Mobile validation (10 digits)
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    // Billing Address
    if (!formData.billingStreet.trim()) {
      newErrors.billingStreet = "Street is required";
    }
    if (!formData.billingCity.trim()) {
      newErrors.billingCity = "City is required";
    }
    if (!formData.billingState.trim()) {
      newErrors.billingState = "State is required";
    }
    if (!formData.billingZip) {
      newErrors.billingZip = "ZIP code is required";
    } else if (formData.billingZip.length !== 5) {
      newErrors.billingZip = "ZIP code must be 5 digits";
    }

    // Shipping Address (if not same as billing)
    if (!formData.sameAsBilling) {
      if (!formData.shippingStreet.trim()) {
        newErrors.shippingStreet = "Street is required";
      }
      if (!formData.shippingCity.trim()) {
        newErrors.shippingCity = "City is required";
      }
      if (!formData.shippingState.trim()) {
        newErrors.shippingState = "State is required";
      }
      if (!formData.shippingZip) {
        newErrors.shippingZip = "ZIP code is required";
      } else if (formData.shippingZip.length !== 5) {
        newErrors.shippingZip = "ZIP code must be 5 digits";
      }
    }

    // Credit Card validation
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Expiry Date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (formData.expiryDate.length !== 5) {
      newErrors.expiryDate = "Invalid expiry date format (MM/YY)";
    } else {
      const [month, year] = formData.expiryDate.split("/");
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);
      
      if (monthNum < 1 || monthNum > 12) {
        newErrors.expiryDate = "Invalid month (01-12)";
      } else {
        // Check if card is expired
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Last 2 digits
        const currentMonth = currentDate.getMonth() + 1;
        
        if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
          newErrors.expiryDate = "Card has expired";
        }
      }
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    // Terms and Conditions
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Submitting:", formData);
      alert("Congratulations! Your order has been placed successfully!");
      navigate("/");
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const sectionStyle = {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "25px",
    marginBottom: "20px",
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "8px",
    border: `1px solid ${hasError ? "#dc3545" : "#ddd"}`,
    borderRadius: "4px",
    fontSize: "14px",
  });

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#333",
  };

  const fieldStyle = {
    marginBottom: "15px",
  };

  const errorStyle = {
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "5px",
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>Checkout</h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>
            Personal Information
          </h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>First Name: *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={inputStyle(errors.firstName)}
            />
            {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Last Name: *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={inputStyle(errors.lastName)}
            />
            {errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Email: *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle(errors.email)}
            />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Mobile: *</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="1234567890"
              style={inputStyle(errors.mobile)}
            />
            {errors.mobile && <div style={errorStyle}>{errors.mobile}</div>}
          </div>
        </div>

        {/* Billing Address */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>
            Billing Address
          </h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>Street: *</label>
            <input
              type="text"
              name="billingStreet"
              value={formData.billingStreet}
              onChange={handleChange}
              style={inputStyle(errors.billingStreet)}
            />
            {errors.billingStreet && <div style={errorStyle}>{errors.billingStreet}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>City: *</label>
            <input
              type="text"
              name="billingCity"
              value={formData.billingCity}
              onChange={handleChange}
              style={inputStyle(errors.billingCity)}
            />
            {errors.billingCity && <div style={errorStyle}>{errors.billingCity}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>State: *</label>
            <input
              type="text"
              name="billingState"
              value={formData.billingState}
              onChange={handleChange}
              style={inputStyle(errors.billingState)}
            />
            {errors.billingState && <div style={errorStyle}>{errors.billingState}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>ZIP Code: *</label>
            <input
              type="text"
              name="billingZip"
              value={formData.billingZip}
              onChange={handleChange}
              placeholder="12345"
              style={inputStyle(errors.billingZip)}
            />
            {errors.billingZip && <div style={errorStyle}>{errors.billingZip}</div>}
          </div>
        </div>

        {/* Same as Billing Address Checkbox */}
        <div style={{ ...sectionStyle, padding: "15px 25px" }}>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="sameAsBilling"
              checked={formData.sameAsBilling}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            <span style={{ fontSize: "14px" }}>Same as billing address</span>
          </label>
        </div>

        {/* Shipping Address */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>
            Shipping Address
          </h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>Street: *</label>
            <input
              type="text"
              name="shippingStreet"
              value={formData.shippingStreet}
              onChange={handleChange}
              disabled={formData.sameAsBilling}
              style={{
                ...inputStyle(errors.shippingStreet),
                background: formData.sameAsBilling ? "#f5f5f5" : "#fff",
              }}
            />
            {errors.shippingStreet && <div style={errorStyle}>{errors.shippingStreet}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>City: *</label>
            <input
              type="text"
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
              disabled={formData.sameAsBilling}
              style={{
                ...inputStyle(errors.shippingCity),
                background: formData.sameAsBilling ? "#f5f5f5" : "#fff",
              }}
            />
            {errors.shippingCity && <div style={errorStyle}>{errors.shippingCity}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>State: *</label>
            <input
              type="text"
              name="shippingState"
              value={formData.shippingState}
              onChange={handleChange}
              disabled={formData.sameAsBilling}
              style={{
                ...inputStyle(errors.shippingState),
                background: formData.sameAsBilling ? "#f5f5f5" : "#fff",
              }}
            />
            {errors.shippingState && <div style={errorStyle}>{errors.shippingState}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>ZIP Code: *</label>
            <input
              type="text"
              name="shippingZip"
              value={formData.shippingZip}
              onChange={handleChange}
              disabled={formData.sameAsBilling}
              placeholder="12345"
              style={{
                ...inputStyle(errors.shippingZip),
                background: formData.sameAsBilling ? "#f5f5f5" : "#fff",
              }}
            />
            {errors.shippingZip && <div style={errorStyle}>{errors.shippingZip}</div>}
          </div>
        </div>

        {/* Credit Card Information */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>
            Credit Card Information
          </h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>Card Number: *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234567890123456"
              style={inputStyle(errors.cardNumber)}
            />
            {errors.cardNumber && <div style={errorStyle}>{errors.cardNumber}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Expiry Date: *</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              style={inputStyle(errors.expiryDate)}
            />
            {errors.expiryDate && <div style={errorStyle}>{errors.expiryDate}</div>}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>CVV: *</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              style={inputStyle(errors.cvv)}
            />
            {errors.cvv && <div style={errorStyle}>{errors.cvv}</div>}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div style={{ ...sectionStyle, padding: "15px 25px" }}>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            <span style={{ fontSize: "14px" }}>I agree to the Terms and Conditions *</span>
          </label>
          {errors.agreeTerms && <div style={errorStyle}>{errors.agreeTerms}</div>}
        </div>

        {/* Pay Now Button */}
        <button
          type="submit"
          disabled={!formData.agreeTerms}
          style={{
            width: "100%",
            padding: "15px",
            background: formData.agreeTerms ? "#333" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: formData.agreeTerms ? "pointer" : "not-allowed",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;