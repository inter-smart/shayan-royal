"use client";

import { Search, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 404 Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4 border border-gray-800">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        </div>

        {/* 404 Visual */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-gray-700 mb-2">404</div>
        </div>

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

        {/* Helpful Links */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Need help?
            <a href="/contact" className="text-gray-300 hover:text-white underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
