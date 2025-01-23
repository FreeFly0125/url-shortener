import React from "react";
import { FaLink } from "react-icons/fa";

export const HeaderBar: React.FC = () => {
  const username = localStorage.getItem("username");
  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">URL Shortener</h1>
        <FaLink className="ml-4 text-gray-600" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-800 font-medium">{username}</span>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};
