import React from "react";
import { withMainlayout } from "../layouts";
import { UrlShortener } from "../components";

export const Dashboard: React.FC = withMainlayout(() => {
  return <UrlShortener />;
});
