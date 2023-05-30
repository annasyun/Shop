import React from "react";

function ProductCard({ product }) {
  return (
    <div>
      <img src={product.imageUrl} alt={product.productName} />
      <h3>{product.productName}</h3>
      <p>₩{product.price}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>{product.options.join(", ")}</p>
    </div>
  );
}

export default ProductCard;
