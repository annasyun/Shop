import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const navigateToProductDetail = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div onClick={navigateToProductDetail}>
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
