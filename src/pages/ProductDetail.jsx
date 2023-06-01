import React, { useState } from "react";
import { useQuery } from "react-query";
import { addToCart, getProductById } from "../api/firebase";
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

  const handleClick = () => {
    // 장바구니에 상품 추가
    const selectedOption =
      selected || (product?.options && product.options[0]) || "";
    addToCart(
      product.id,
      product.productName,
      product.imageUrl,
      selectedOption,
      product.price
    );
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
      <p className="mx-4 mb-4 text-gray-600">{product.category}</p>
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full md:w-7/12"
        />
        <div className="w-full md:w-5/12 flex flex-col">
          <h3 className="text-3xl font-bold py-2">{product.productName}</h3>
          <p className="text-2xl font-bold border-b-2 border-solid border-gray-300 py-2">
            ₩{product.price}
          </p>
          <p className="text-gray-600 text-lg py-4">{product.description}</p>
          <div className="flex items-center">
            <label htmlFor="select" className="text-brand font-bold">
              옵션 :
            </label>
            <select
              id="select"
              onChange={handleSelected}
              value={selected}
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
            >
              {product.options?.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          <Button
            className="w-full"
            text={"장바구니에 추가"}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
