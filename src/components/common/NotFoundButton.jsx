"use client";
import { useRouter } from "next/navigation";
import {  Home, ArrowLeft } from "lucide-react";

export default function NotFoundButton({ onClick }) {
  const router = useRouter();

  return (
    <>
      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => router.back()}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-600 transition-colors border border-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full inline-flex items-center justify-center px-4 py-3 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 transition-colors border border-gray-700"
        >
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </button>
      </div>
    </>
  );
}
