import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserAuthProps {
  isSignIn: boolean;
}

export const UserAuth: React.FC<UserAuthProps> = ({ isSignIn }) => {
  const SERVER_API = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (username && token) navigate("/dashboard");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isSignIn ? "/auth/signin" : "/auth/signup";
    const payload = { username, password };

    try {
      const response = await fetch(`${SERVER_API}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        if (isSignIn) {
          localStorage.setItem("username", data.username);
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          alert("Successfully signed up!");
        }
      } else if (response.status === 409) {
        alert("User already exist!");
      } else {
        alert("Error: " + (await response.text()));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-1/2 h-1/2 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <button
          onClick={() => {
            setUsername("");
            setPassword("");
            navigate(isSignIn ? "/signup" : "/signin");
          }}
          className="mt-4 text-blue-600 hover:underline text-sm text-center"
        >
          {isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
};
