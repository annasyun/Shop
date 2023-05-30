import React, { useEffect, useState } from "react";
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
      price: parseInt(price),
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
        setShowSuccessMessage(true); // 메시지 표시 상태로 변경
        const fileInput = document.getElementById("file-input");
        if (fileInput) {
          fileInput.value = null;
        }
      })

      .catch((error) => {
        console.error("게시 오류: ", error);
      })
      .finally(() => {
        setIsSubmitting(false); // 등록 완료 후 상태 변경
      });
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return (
    <section className="w-full text-center">
      <h2 className="ir">새로운 제품 등록</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="flex flex-col px-12">
          <legend className="text-2xl font-bold my-4">새로운 제품 등록</legend>
          {showSuccessMessage && (
            <p className="my-2">제품 등록이 완료되었습니다!</p>
          )}

          {imageUrl ? (
            <img src={imageUrl} className="w-96 mx-auto mb-2" />
          ) : (
            <p>상품 이미지를 업로드 해주세요</p>
          )}
          <label>
            <input
              className="p-4"
              id="file-input"
              type="file"
              accept="image/*"
              required
              onChange={fileChange}
            />
          </label>
          <label>
            <input
              className="p-4"
              placeholder="제품명"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
          <label>
            <input
              className="p-4"
              placeholder="가격"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            <input
              className="p-4"
              placeholder="카테고리"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label>
            <input
              className="p-4"
              placeholder="제품 설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <input
              className="p-4"
              placeholder="옵션들(콤마(,)로 구분)"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand text-white p-2"
          >
            {isSubmitting ? "제품 등록 중입니다..." : "제품 등록하기"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
