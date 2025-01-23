import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const PreUrl: React.FC = () => {
  const navigate = useNavigate();

  const SERVER_API = process.env.REACT_APP_SERVER_URL;
  const jwtoken = localStorage.getItem("token");

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    const api = `${SERVER_API}/url/origin`;

    const response = await fetch(`${api}?url=${inputValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtoken}`,
      },
    });

    if (response.status === 302) {
      const data = await response.json();
      window.open(data.orgUrl, "_blank");
    } else {
      alert("Url is not found!");
    }
  };

  return (
    <div className="flex w-3/4 justify-between items-center">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a URL"
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500 w-full"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded"
          onClick={handleSubmit}
        >
          <FaExternalLinkAlt />
        </button>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/new")}
      >
        <p>New URL</p>
      </button>
    </div>
  );
};