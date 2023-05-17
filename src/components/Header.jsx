import React from "react";
import { AiTwotoneShopping } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";

export default function Header() {
  return (
    <header>
      <h1>
        <AiTwotoneShopping />
        Shop
      </h1>
      <nav>
        <ul>
          <li>products</li>
          <li>
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
