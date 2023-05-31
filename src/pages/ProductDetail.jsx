import React, { useState } from "react";
import { useQuery } from "react-query";
import { getProductById } from "../api/firebase";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";

function ProductDetail() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], () => getProductById(id), {
    enabled: !!id, // id 값이 존재할 때만 쿼리 실행
  });

  const [selected, setSelected] = useState(
    product?.options && product.options[0] ? product.options[0] : ""
  );

  const handleSelected = (e) => {
    setSelected(e.target.value);
  };

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
    <div className="p-4">
      <p className="mb-4 px-2 text-gray-600">{product.category}</p>
      <div className="flex gap-6">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-3/5"
        />
        <div className="w-full">
          <h3 className="text-4xl mb-2">{product.productName}</h3>
          <p className="text-xl border-b-2 border-solid border-gray-300 mb-2">
            ₩{product.price}
          </p>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <div className="mb-2">
            <p>옵션:</p>
            <select onChange={handleSelected} value={selected}>
              {product.options?.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          <Button className="w-full" text={"장바구니에 추가"} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
