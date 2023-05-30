import React, { useState } from "react";

export default function Banner() {
  const [mainText, setMainText] = useState("Shop With US");
  const [subText, setSubText] = useState("Best Products, High Quality");
  return (
    <div className="w-full h-80 bg-banner bg-cover text-center text-white flex items-center justify-center ">
      <div>
        <p className="text-4xl">{mainText}</p>
        <p className="text-2xl">{subText}</p>
      </div>
    </div>
  );
}
