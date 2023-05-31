import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import { getAllProducts } from "../api/firebase";

export default function AllProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery("products", getAllProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
