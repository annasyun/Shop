import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const postsRef = ref(database, "posts");

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
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            <div>
              <img src={product.imageUrl} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <p>Options: {product.options.join(", ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
