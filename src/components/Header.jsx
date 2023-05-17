import React from "react";
import { AiTwotoneShopping } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const navigateToApp = () => {
    navigate("/");
  };
  const navigateToProducts = () => {
    navigate("/products");
  };
  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <header className="flex justify-between bg-slate-400 cursor-pointer">
      <h1 className="flex" onClick={navigateToApp}>
        <AiTwotoneShopping />
        Shop
      </h1>
      <nav>
        <ul className="flex">
          <li onClick={navigateToProducts}>Products</li>
          <li onClick={navigateToCart}>
            <BsFillCartFill />
          </li>
          <li>
            <button>Login</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
