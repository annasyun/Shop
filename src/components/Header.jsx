import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from './CartStatus';

export default function Header() {
  const { userData, login, logout } = useAuthContext();
  return (
    <header className="flex justify-between border-b border-gray-300 bg-slate-400 cursor-pointer p-2">
      <Link to={"/"} className="flex items-center text-brand">
        <AiOutlineShopping className="text-4xl" />
        <h1 className="text-2xl">Shop</h1>
      </Link>
      <nav>
        <ul className="flex items-center bg-amber-300 gap-4 font-semibold">
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
          {userData && (
            <li>
              <Link to={"/cart"}><CartStatus/></Link>
            </li>
          )}
          {userData && userData.isAdmin && (
            <li>
              <Link to={"products/new"}>
                <BsPencilFill />
              </Link>
            </li>
          )}
          <li className="flex items-center space-x-2">
            {userData && <UserProfile userData={userData} />}
            {!userData && <Button text={"Login"} onClick={login} />}
            {userData && <Button text={"Logout"} onClick={logout} />}
          </li>
        </ul>
      </nav>
    </header>
  );
}
