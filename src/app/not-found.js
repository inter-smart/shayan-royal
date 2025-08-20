import NotFoundButton from "@/components/common/NotFoundButton";
import { Search } from "lucide-react";

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. It may have been moved, deleted, or you entered the wrong URL.',
  keywords: '404, not found, page not found, error, missing page',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  
  openGraph: {
    title: '404 - Page Not Found',
    description: 'Sorry, the page you are looking for could not be found.',
    type: 'website',
  },
  
  twitter: {
    card: 'summary',
    title: '404 - Page Not Found',
    description: 'Sorry, the page you are looking for could not be found.',
  },
  
  other: {
    'http-equiv': 'refresh',
  },
}

export default function NotFound() {
  
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
        
       <NotFoundButton />
        
        {/* Helpful Links */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Need help? {" "}
            <a href="/contact" className="text-gray-300 hover:text-white underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}