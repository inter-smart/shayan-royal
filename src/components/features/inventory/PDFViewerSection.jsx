"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ fileUrl }) {
  if (!fileUrl) {
    return <div className="flex items-center justify-center min-h-[50vh] text-gray-500 text-lg">No PDF Available</div>;
  }

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

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(1024);

  // Resize handler with debounce-like effect
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // reset to first page on load
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
  }, [numPages]);

  const computedWidth = viewportWidth < 768 ? viewportWidth - 60 : undefined;

  return (
    <section className="py-[10px_30px] 3xl:py-[20px_40px] relative z-0">
      <div className="container">
        <div className="max-w-[650px] m-auto">
          <div className="flex flex-col items-center bg-[#4b4b4b3d] p-[15px] mb-[15px] transition-all duration-200">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => console.error("PDF load error:", err)}
              loading={<p>Loading PDF...</p>}
              error={<p className="text-red-500">Failed to load PDF.</p>}
              className="shadow-lg w-full h-full mb-[20px]"
            >
              <Page
                key={`${pageNumber}-${computedWidth}`} // ensure re-render only when needed
                pageNumber={pageNumber}
                width={computedWidth}
                className="w-full h-auto transition-all duration-200 ease-in-out"
              />
            </Document>

            <div className="flex gap-4 items-center z-10 touch-auto relative mt-2">
              <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
                Prev
              </button>
              <span className="text-sm">
                Page {pageNumber} of {numPages}
              </span>
              <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">
                Next
              </button>
            </div>
          </div>

          <button
            onClick={handleFileDownload}
            aria-label="download spec"
            className="text-[12px] 2xl:text-[14px] 3xl:text-[16px]
           text-white bg-[#2E4C99] uppercase rounded-[50px] 
           h-[30px] 2xl:h-[35px] 3xl:h-[40px] flex items-center justify-center m-auto 
           lg:m-0 lg:ml-auto px-[10px] max-w-[140px] xl:max-w-[150px] 2xl:max-w-[180px] 
           3xl:max-w-[210px] hover:bg-[#1f3574] transition-all duration-200 cursor-pointer"
          >
            DOWNLOAD SPECS
          </button>
        </div>
      </div>
    </section>
  );
}
