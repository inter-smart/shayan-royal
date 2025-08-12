"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ fileUrl }) {
  if (!fileUrl) {
    return null;
  }

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Resize handler with debounce-like effect
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
        if (window.innerWidth < 1024) {
          setSidebarOpen(false);
        }
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  const handlePageClick = (page) => {
    setPageNumber(page);
    if (viewportWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleFileDownload = async () => {
    if (!fileUrl) return;

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileUrl.split("/").pop() || "document.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handlePrint = () => {
    window.open(fileUrl, '_blank');
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  };

  const mainWidth = viewportWidth < 768 ? viewportWidth - 40 : sidebarOpen ? 600 : 800;

  return (
    <section className="py-[20px] 3xl:py-[30px] relative z-0">
      <div className="container">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with controls */}
          <div className="bg-[#2E4C99] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[20px] font-medium">
                Specification Document
              </h3>
              {numPages && (
                <span className="text-[12px] xl:text-[14px] 2xl:text-[16px] opacity-80">
                  Page {pageNumber} of {numPages}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Toggle sidebar button for desktop */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition-colors"
                title="Toggle page preview"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </button>

              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition-colors"
                title="Show pages"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h6v-2H3v2zM3 6v2h6V6H3zm0 7h6v-2H3v2zm7-7v2h11V6H10zm0 5h11v-2H10v2zm0 5h11v-2H10v2z"/>
                </svg>
              </button>

              {/* Print button */}
              <button
                onClick={handlePrint}
                className="flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition-colors"
                title="Open in new tab"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </button>

              {/* Download button */}
              <button
                onClick={handleFileDownload}
                className="flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition-colors"
                title="Download PDF"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex relative">
            {/* Sidebar with page previews */}
            <div className={`${
              sidebarOpen ? 'w-[200px] lg:w-[250px]' : 'w-0'
            } transition-all duration-300 overflow-hidden bg-gray-50 border-r border-gray-200`}>
              {sidebarOpen && numPages && (
                <div className="p-4">
                  <h4 className="text-[12px] xl:text-[14px] font-medium text-gray-700 mb-3">
                    Pages ({numPages})
                  </h4>
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {Array.from({ length: numPages }, (_, index) => (
                      <div key={index + 1} className="relative">
                        <button
                          onClick={() => handlePageClick(index + 1)}
                          className={`w-full p-2 rounded border-2 transition-all duration-200 ${
                            pageNumber === index + 1
                              ? 'border-[#2E4C99] bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <Document file={fileUrl} className="pointer-events-none">
                            <Page
                              pageNumber={index + 1}
                              width={150}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              className="shadow-sm"
                            />
                          </Document>
                          <span className={`text-[10px] xl:text-[12px] font-medium mt-1 block ${
                            pageNumber === index + 1 ? 'text-[#2E4C99]' : 'text-gray-600'
                          }`}>
                            Page {index + 1}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main content area */}
            <div className="flex-1 bg-gray-100">
              <div className="flex flex-col items-center p-4">
                {/* Main document display */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
                  <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={(err) => console.error("PDF load error:", err)}
                    loading={
                      <div className="flex items-center justify-center min-h-[400px] text-gray-500">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2E4C99] mx-auto mb-2"></div>
                          <p>Loading PDF...</p>
                        </div>
                      </div>
                    }
                    error={
                      <div className="flex items-center justify-center min-h-[400px]">
                        <p className="text-red-500">Failed to load PDF.</p>
                      </div>
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={mainWidth}
                      className="transition-all duration-200 ease-in-out"
                    />
                  </Document>
                </div>

                {/* Navigation controls */}
                {numPages && (
                  <div className="flex items-center gap-4 bg-white rounded-lg shadow-md px-4 py-2">
                    <button
                      onClick={goToPrevPage}
                      disabled={pageNumber <= 1}
                      className="flex items-center gap-2 px-3 py-2 text-[12px] xl:text-[14px] font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
                      </svg>
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={numPages}
                        value={pageNumber}
                        onChange={(e) => {
                          const page = parseInt(e.target.value);
                          if (page >= 1 && page <= numPages) {
                            setPageNumber(page);
                          }
                        }}
                        className="w-16 px-2 py-1 text-center text-[12px] xl:text-[14px] border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2E4C99] focus:border-transparent"
                      />
                      <span className="text-[12px] xl:text-[14px] text-gray-600">
                        of {numPages}
                      </span>
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={pageNumber >= numPages}
                      className="flex items-center gap-2 px-3 py-2 text-[12px] xl:text-[14px] font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      Next
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile overlay for sidebar */}
          {sidebarOpen && viewportWidth < 1024 && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
