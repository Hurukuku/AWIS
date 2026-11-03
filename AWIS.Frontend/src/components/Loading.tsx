import React from "react";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "Ładowanie..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-gray-400 gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-blue-500" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

