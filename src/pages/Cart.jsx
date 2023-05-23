import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ userData, login, setAuth, auth }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = auth === "true"; // auth 값이 "true"이면 로그인 상태로 간주

    if (!isLogin) {
      navigate("/"); // 로그인되지 않은 상태라면 홈페이지로 리다이렉트
    }

    setLoading(false); // 로딩 상태 업데이트
  }, [auth, navigate]);

  useEffect(() => {
    const authValue = sessionStorage.getItem("auth"); // 세션 스토리지에서 auth 값을 가져옴
    setAuth(authValue); // auth 값을 업데이트하여 useEffect를 트리거
  }, [login]);

  return <>{loading ? <div>Loading...</div> : <div>Cart</div>}</>;
}
