import React from "react";

function ProductCard({ product }) {
  return (
    <div>
      <img
        className="w-full"
        src={product.imageUrl}
        alt={product.productName}
      />
      <div className="mt-2 px-2 text-lg">
        <h3 className="truncate">{product.productName}</h3>
        <p>₩{product.price}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{product.category}</p>
    </div>
  );
}

export default ProductCard;
