import React, { useEffect } from "react";
import { withMainlayout } from "../layouts";
import { UrlShortener } from "../components";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = withMainlayout(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!(username && token)) navigate("/signin");
  }, []);

  return <UrlShortener />;
});
