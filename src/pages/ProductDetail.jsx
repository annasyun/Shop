import React from "react";
import { useQuery } from "react-query";
import { getProductById } from "../api/firebase";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], () => getProductById(id), {
    enabled: !!id, // id 값이 존재할 때만 쿼리 실행
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // product를 사용하여 상세 페이지를 구성
  return (
    <div>
      <h2>Product Detail</h2>
      <h3>{product.productName}</h3>
      <img src={product.imageUrl} alt={product.productName} />
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetail;
