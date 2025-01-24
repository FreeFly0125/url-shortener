import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaClipboard,
  FaExternalLinkAlt,
  FaSyncAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface UrlData {
  id: number;
  origin: string;
  shorten: string;
}

export const UrlTable: React.FC = () => {
  const navigate = useNavigate();
  const jwtoken = localStorage.getItem("token");
  const SERVER_API = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
  const URL_PREFIX = process.env.REACT_APP_URL_PREFIX || "https://short.ly";

  const [data, setData] = useState<UrlData[]>([]);
  const [curId, setCurId] = useState<number | null>(null);
  const [editedUrl, setEditedUrl] = useState<string>("");
  const [curCopiedId, setCurCopiedId] = useState<number | null>(null);

  const getUrlData = async () => {
    const response = await fetch(`${SERVER_API}/url`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtoken}`,
      },
    });

    if (response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      alert("Session is expired!");
      navigate("/signin");
    } else if (!response.ok) {
      alert("Failed to fetch data!");
      return;
    }

    const urlData: UrlData[] = await response.json();
    setData(urlData);
  };

  useEffect(() => {
    getUrlData();
  }, []);

  const isValidShortUrl = (url: string) => {
    const regex = new RegExp(`^${URL_PREFIX}/[a-zA-Z0-9]{6}$`);
    return regex.test(url);
  };

  const handleReset = async (orgUrl: string) => {
    if (curId === null || editedUrl.trim() === "") return;
    if (!isValidShortUrl(editedUrl)) {
      alert("Short URL must start with the prefix and be 6 characters long.");
      return;
    }

    const response = await fetch(`${SERVER_API}/url`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtoken}`,
      },
      body: JSON.stringify({ orgUrl: orgUrl, newUrl: editedUrl }),
    });

    if (response.ok) {
      const data = await response.json();
      setData((prev) =>
        prev.map((item) =>
          item.id === curId ? { ...item, shorten: editedUrl } : item
        )
      );
      setCurId(null);
      setEditedUrl("");
    } else {
      alert("Failed to reset the URL.");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`${SERVER_API}/url`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtoken}`,
      },
      body: JSON.stringify({ id: id }),
    });
    if (response.ok)
      setData((prevData) => prevData.filter((item) => item.id !== id));
    else alert("Failed to delte record!");
  };

  const handleOpenUrl = (url: string) => {
    window.open(url, "_blank");
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex w-3/4">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 w-1/12">ID</th>
              <th className="border border-gray-300 px-4 py-2 w-1/2">Origin</th>
              <th className="border border-gray-300 px-4 py-2 w-1/3">
                Shorten
              </th>
              <th className="border border-gray-300 px-4 py-2 w-1/6"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.origin}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={curId === item.id ? editedUrl : item.shorten}
                    onChange={(e) => {
                      setCurId(item.id);
                      setEditedUrl(e.target.value);
                    }}
                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleReset(item.origin)}
                      className={`${
                        curId !== item.id
                          ? "bg-gray-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white px-2 py-1 rounded`}
                      disabled={curId !== item.id}
                    >
                      <FaSyncAlt />
                    </button>
                    <button
                      onClick={() => handleOpenUrl(item.origin)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      <FaExternalLinkAlt />
                    </button>
                    <button
                      onClick={() => {
                        handleCopy(item.shorten);
                        setCurCopiedId(item.id);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      {curCopiedId === item.id ? <FaCheck /> : <FaClipboard />}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
