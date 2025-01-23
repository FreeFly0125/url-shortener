import React from "react";
import { FaLink } from "react-icons/fa";

export const HeaderBar: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">URL Shortener</h1>
      <div className="ml-4">
        <FaLink className="text-gray-600" />
      </div>
    </header>
  );
};
