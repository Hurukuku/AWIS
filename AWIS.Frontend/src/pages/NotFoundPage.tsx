import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="text-2xl font-bold">404</div>
      <div className="text-lg">Page not found</div>
      <a href="/" className="text-blue-500 hover:underline">
        Go back to home
      </a>
    </div>
  );
}
