import { useState, useEffect } from "react";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { login, logout, onUserStateChange } from "../api/firebase";
import UserProfile from "./UserProfile";
import Cart from "./Cart";

export default function Header() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    onUserStateChange(setUserData);
  }, []);

  return (
    <header className="flex justify-between border-b border-gray-300 bg-slate-400 cursor-pointer p-2">
      {/* 로고 */}
      <Link to={"/"} className="flex items-center text-brand">
        <AiOutlineShopping className="text-4xl" />
        <h1 className="text-2xl">Shop</h1>
      </Link>
      {/* 상품 보기, 장바구니, 로그인 및 유저 정보 */}
      <nav>
        <ul className="flex items-center bg-amber-300 gap-4 font-semibold">
          {/* 상품 보기 */}
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
          {/* 장바구니 */}
          {userData && (
            <li>
              <Cart />
            </li>
          )}
          {userData && (
            <li>
              <Link to={"products/new"}>
                <BsPencilFill />
              </Link>
            </li>
          )}
          <li className="flex items-center space-x-2">
            {userData && <UserProfile userData={userData} />}
            {!userData && (
              <button
                onClick={login}
                className="bg-red-400 text-white p-2 px-4 rounded-md"
              >
                Login
              </button>
            )}
            {userData && (
              <button
                onClick={logout}
                className="bg-red-400 text-white p-2 px-4 rounded-md"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
