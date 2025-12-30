"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const documentRef = useRef(null);
  const pageRefs = useRef({});

  // Optimized resize handler with debounce
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewportWidth(window.innerWidth);
      }, 150);
    };

    setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    console.error("PDF load error:", error);
    setIsLoading(false);
  }, []);

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

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download file. Please try again.");
    }
  };

  const handlePrint = () => {
    try {
      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error("Print error:", error);
      alert("Failed to open file. Please try again.");
    }
  };

  const goToPrevPage = () => {
    console.log("Previous page clicked");
    setPageNumber((prev) => {
      const newPage = Math.max(1, prev - 1);
      scrollToPage(newPage);
      return newPage;
    });
  };

  const goToNextPage = () => {
    console.log("Next page clicked");

    setPageNumber((prev) => {
      const newPage = Math.min(numPages, prev + 1);
      scrollToPage(newPage);
      return newPage;
    });
  };

  const scrollToPage = (page) => {
    const pageElement = pageRefs.current[page];
    const container = documentRef.current;

    console.log("Scrolling to page:", pageElement, container);

    if (pageElement && container) {
      const containerRect = container.getBoundingClientRect();
      const pageRect = pageElement.getBoundingClientRect();
      const scrollOffset = pageRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
  };

  // Track visible page while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const page = parseInt(entry.target.dataset.page);
            if (!isNaN(page)) {
              setPageNumber(page);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    Object.values(pageRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [numPages]);

  const mainWidth = viewportWidth < 768 ? viewportWidth - 40 : 800;

  return (
    <section className="py-[20px] 3xl:py-[30px] relative z-0">
      <div className="container">
        <div className="bg-white overflow-hidden md:max-w-[85%] lg:max-w-[50%] m-auto">
          {/* Header with controls */}
          <div className="bg-[#3C3C3C] text-white p-4 flex items-center justify-between">
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap">
                <h3 className="text-[8px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] font-medium px-[5px] shrink-0">Specification Document</h3>
                {numPages && (
                  <>
                    <span className="text-[7px] xl:text-[9px] 2xl:text-[11px] 3xl:text-[13px] opacity-80 shrink-0">
                      <span className="bg-[#1E1E1E] p-[2px_6px]">{pageNumber}</span> / <span className="p-[2px_6px]">{numPages}</span>
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-all active:scale-95" aria-label="Previous page">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                        </svg>
                      </button>
                      <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-all active:scale-95" aria-label="Next page">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition-colors"
                  title="Open in new tab"
                  aria-label="Print document"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </button>

                {/* Download button */}
                <button
                  onClick={handleFileDownload}
                  className="flex items-center justify-center w-8 h-8 rounded hover:bg-white/10 transition-colors"
                  title="Download PDF"
                  aria-label="Download document"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#D9D9D9] md:p-[10px]">
            {/* Scrollable document area */}
            <div className="flex-1 bg-[#D9D9D9]">
              <div
                ref={documentRef}
                className="flex flex-col items-center p-4 max-h-[70vh] overflow-y-auto scroll-smooth"
                style={{ scrollbarWidth: "thin" }}
              >
                {isLoading && (
                  <div className="flex items-center justify-center min-h-[400px] text-gray-500">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2E4C99] mx-auto mb-2"></div>
                      <p>Loading PDF...</p>
                    </div>
                  </div>
                )}

                <Document
                  file={fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null}
                  error={
                    <div className="flex items-center justify-center min-h-[400px]">
                      <p className="text-red-500">Failed to load PDF. Please try again.</p>
                    </div>
                  }
                >
                  {numPages &&
                    Array.from({ length: numPages }, (_, index) => (
                      <div
                        key={index + 1}
                        ref={(el) => (pageRefs.current[index + 1] = el)}
                        data-page={index + 1}
                        className="bg-white shadow-lg w-full mb-4 last:mb-0"
                      >
                        <Page
                          pageNumber={index + 1}
                          width={mainWidth}
                          className="transition-all duration-200 ease-in-out"
                          loading={
                            <div className="flex items-center justify-center min-h-[400px] bg-gray-100">
                              <div className="animate-pulse text-gray-400">Loading page {index + 1}...</div>
                            </div>
                          }
                        />
                        <div className="text-center py-2 bg-gray-100 text-sm text-gray-600">
                          Page {index + 1} of {numPages}
                        </div>
                      </div>
                    ))}
                </Document>
              </div>
            </div>
          </div>

          <button
            onClick={handleFileDownload}
            aria-label="download spec"
            className="text-[12px] 2xl:text-[14px] 3xl:text-[16px]
           text-white bg-[#2E4C99] uppercase rounded-[50px] 
         h-[30px] 2xl:h-[35px] 3xl:h-[40px] flex items-center justify-center m-auto 
         lg:m-0 lg:ml-auto px-[10px] max-w-[140px] xl:max-w-[150px] 2xl:max-w-[180px] 
         3xl:max-w-[210px] hover:bg-[#be1e2d] !mt-[20px] transition-colors active:scale-95"
          >
            DOWNLOAD SPECS
          </button>
        </div>
      </div>
    </section>
  );
}
