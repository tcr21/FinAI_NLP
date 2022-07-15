import React from "react";
import { useLocation } from "react-router";

function NotFoundPage() {
  const location = useLocation();
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        Something went wrong. No page was found at path: {location.pathname}.
      </p>
    </main>
  );
}

export default NotFoundPage;
