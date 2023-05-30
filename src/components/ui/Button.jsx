import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110 w-full"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
