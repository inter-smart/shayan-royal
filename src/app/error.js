"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to monitoring service (Sentry, etc.)
    console.error("Application error:", error);
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 text-sm">We encountered an unexpected error. Please try again.</p>
        </div>

        {/* Error Details (Development Only) */}
        {isDevelopment && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-red-800 mb-2">Error Details (Development)</h3>
            <p className="text-xs text-red-700 font-mono break-all">{error.message}</p>
            {error.digest && <p className="text-xs text-red-600 mt-1">Error ID: {error.digest}</p>}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full inline-flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </button>
        </div>

        {/* Support Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Still having issues?{" "}
            <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
