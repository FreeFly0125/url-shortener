import React, { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import validator from "validator";

export const UrlShortener: React.FC = () => {
  const SERVER_API = process.env.REACT_APP_SERVER_URL;
  const URL_PREFIX = process.env.REACT_APP_URL_PREFIX;

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const isValidShortUrl = (url: string) => {
    const regex = new RegExp(`^${URL_PREFIX}/[a-zA-Z0-9]{6}$`);
    return regex.test(url);
  };

  const handleShorten = async () => {
    setError("");
    setShortUrl("");

    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    if (!validator.isURL(url)) {
      setError("Please input a valid URL!");
      return;
    }

    const response = await fetch(`${SERVER_API}/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orgUrl: url }),
    });

    if (response.ok) {
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } else {
      setError("Failed to shorten the URL.");
    }
  };

  const handleShortUrlChange = async () => {
    if (isValidShortUrl(shortUrl)) {
      setError(
        "Short URL must start with the prefix and be 6 characters long."
      );
      return;
    }

    const response = await fetch(`${SERVER_API}/url`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orgUrl: url, newUrl: shortUrl }),
    });

    if (response.ok) {
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } else {
      setError("Failed to reset the URL.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 bg-white shadow-md rounded w-1/2 h-1/2">
        <h2 className="text-lg font-bold">Enter the URL to shorten</h2>
        <label className="block mt-4">URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded"
          placeholder="https://example.com"
        />
        <button
          onClick={handleShorten}
          className="mt-4 bg-purple-600 text-white p-2 rounded"
        >
          Shorten
        </button>

        {shortUrl && (
          <div className="mt-4 p-4">
            <p className="text-green-600 mb-4">
              Success! Here's your short URL:
            </p>
            <div className="flex justify-between">
              <input
                type="text"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
                className="border border-gray-300 p-2 w-1/2 rounded"
              />
              <div className="flex gap-2">
                <button
                  className="pl-4 pr-4 flex items-center bg-green-600 text-white p-1 rounded"
                  onClick={handleShortUrlChange}
                >
                  Reset
                </button>
                <button className="pr-4 pl-4 flex items-center border-2 border-purple-600 text-white p-1 rounded">
                  <FaClipboard className="mr-1" style={{ color: "purple" }} />
                  <p className="text-purple-500">Copy</p>
                </button>
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};
