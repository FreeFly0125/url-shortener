import React, { useEffect, useState } from "react";
import { withMainlayout } from "../layouts";
import { PreUrl, UrlTable } from "../components";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = withMainlayout(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (!(username && token)) navigate("/signin");
  }, []);

  return (
    <div className="flex-col">
      <div className="flex pb-4 pt-4 justify-center">
        <PreUrl />
      </div>
      <div className="flex items-center justify-center">
        <UrlTable />
      </div>
    </div>
  );
});
