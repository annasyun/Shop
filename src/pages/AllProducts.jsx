import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import ProductCard from "../components/ProductCard";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const postsRef = ref(database, "products");

    // 데이터 변경 감지
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // 데이터가 존재할 경우 products 상태 업데이트
        const productsData = Object.values(data);
        setProducts(productsData);
      }
    });
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <ul className="grid grid-cols-3 gap-2">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
