import { useState, useEffect } from "react";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { BsCart, BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { login, logout, onUserStateChange } from "../api/firebase";

export default function Header() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUserData(user);
    });
  }, []);

  const handleLogin = () => {
    login().then(setUserData);
  };
  const handleLogout = () => {
    logout().then(setUserData);
  };

  const cartItemCount = 2; // 실제로는 상품 개수를 동적으로 가져와야 함.

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
          <li className="relative">
            <Link to={"/cart"}>
              <BsCart className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="bg-red-400 absolute -top-0.5 -right-0.5 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link to={"products/new"}>
              <BsPencilFill />
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            {userData && (
              <>
                <img src={userData.photoURL} alt="" className="w-7" />
                <span>{userData.displayName}</span>
              </>
            )}
            {!userData && (
              <button
                onClick={handleLogin}
                className="bg-red-400 text-white p-2 px-4 rounded-md"
              >
                Login
              </button>
            )}
            {userData && (
              <button
                onClick={handleLogout}
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
