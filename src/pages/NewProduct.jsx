import React, { useState } from "react";
import { imgUploader } from "../api/cloudinary";

export default function NewProduct() {
  const [imageUrl, setImageUrl] = useState("");

  const fileChange = async (e) => {
    const uploadUrl = await imgUploader(e);
    setImageUrl(uploadUrl);
  };

  return (
    <form>
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
            <input placeholder="제품명" />
          </label>
        </p>
        <p>
          <label>
            <input placeholder="가격" />
          </label>
        </p>
        <p>
          <label>
            <input placeholder="카테고리" />
          </label>
        </p>
        <p>
          <label>
            <input placeholder="제품 설명" />
          </label>
        </p>
        <p>
          <label>
            <input placeholder="옵션들(콤마(,)로 구분)" />
          </label>
        </p>
        <button type="submit">제품 등록하기</button>
      </fieldset>
    </form>
  );
}
