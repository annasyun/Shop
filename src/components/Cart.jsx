import React from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

export default function Cart() {
  const cartItemCount = 2; // 실제로는 상품 개수를 동적으로 가져와야 함.

  return (
    <Link to={"/cart"} className="relative">
      <BsCart className="text-2xl" />
      {cartItemCount > 0 && (
        <span className="bg-red-400 absolute -top-0.5 -right-0.5 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {cartItemCount}
        </span>
      )}
    </Link>
  );
}
