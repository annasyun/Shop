import React, { useState } from "react";
import { imgUploader } from "../api/cloudinary";
import { getDatabase, ref, push } from "firebase/database";

const database = getDatabase();

export default function NewProduct() {
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileChange = async (e) => {
    const uploadUrl = await imgUploader(e);
    setImageUrl(uploadUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 데이터를 새로운 객체로 생성
    const formData = {
      imageUrl,
      productName,
      price,
      category,
      description,
      options: options.split(","),
    }; // 폼 데이터를 Firebase에 저장

    setIsSubmitting(true); // 등록 중 상태로 변경

    const newPostRef = push(ref(database, "posts"), formData)
      .then(() => {
        // 게시 성공 후 폼 초기화
        setImageUrl("");
        setProductName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setOptions("");
      })
      .catch((error) => {
        console.error("게시 오류: ", error);
      })
      .finally(() => {
        setIsSubmitting(false); // 등록 완료 후 상태 변경
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>새로운 제품 등록</legend>
        {imageUrl ? (
          <img src={imageUrl} className="w-1/4" />
        ) : (
          <p>상품 이미지를 업로드 해주세요</p>
        )}
        <p>
          <label>
            <input type="file" accept="image/*" onChange={fileChange} />
          </label>
        </p>
        <p>
          <label>
            <input
              placeholder="제품명"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              placeholder="가격"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              placeholder="카테고리"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              placeholder="제품 설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              placeholder="옵션들(콤마(,)로 구분)"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          </label>
        </p>
        <button type="submit">
          {isSubmitting ? "제품 등록 중입니다..." : "제품 등록하기"}
        </button>
      </fieldset>
    </form>
  );
}
