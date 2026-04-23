import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginTop: "6px",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(5,150,105,0.12)";
        e.currentTarget.style.borderColor = "#a7f3d0";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
        e.currentTarget.style.borderColor = "#e2e8f0";
      }}
    >
      {/* Product Image */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "12px",
          background: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        📱
      </div>

      {/* Product Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Badge */}
        {product.badge && (
          <span
            style={{
              display: "inline-block",
              background: "#fef2f2",
              color: "#e11d48",
              fontSize: "10px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "20px",
              marginBottom: "4px",
            }}
          >
            {product.badge}
          </span>
        )}
        <p
          style={{
            fontSize: "12.5px",
            fontWeight: 600,
            color: "#1e293b",
            fontFamily: "Arial, sans-serif",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "3px",
          }}
        >
          {product.name}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              color: "#e11d48",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {product.price}
          </span>
          {product.oldPrice && (
            <span
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                textDecoration: "line-through",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <button
        style={{
          background: "linear-gradient(135deg, #059669, #10b981)",
          color: "#ffffff",
          border: "none",
          borderRadius: "10px",
          padding: "6px 12px",
          fontSize: "11px",
          fontWeight: 700,
          cursor: "pointer",
          flexShrink: 0,
          fontFamily: "Arial, sans-serif",
          boxShadow: "0 2px 8px rgba(5,150,105,0.3)",
          transition: "transform 0.15s, box-shadow 0.15s",
          whiteSpace: "nowrap",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(5,150,105,0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(5,150,105,0.3)";
        }}
      >
        Xem
      </button>
    </div>
  );
};

export default ProductCard;
