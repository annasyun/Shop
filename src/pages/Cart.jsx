import React from "react";
import { getCart } from "../api/firebase";
import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";

export default function Cart() {
  const shipping = 3000;
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );
  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 제품이 없습니다. 상품을 담아주세요!</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text="상품총액" price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text="배송액" price={shipping} />
            <FaEquals />
            <PriceCard text="총가격" price={totalPrice + shipping} />
          </div>
        </>
      )}
    </section>
  );
}
