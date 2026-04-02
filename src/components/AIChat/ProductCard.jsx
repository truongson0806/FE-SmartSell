import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-2 flex items-center gap-2 shadow-sm bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{product.name}</h4>
        <p className="text-red-500 text-sm">{product.price}</p>
        <button className="mt-1 text-xs bg-blue-500 text-white px-2 py-1 rounded">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
