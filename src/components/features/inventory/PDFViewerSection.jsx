"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <section className="py-[10px_30px] 3xl:py-[20px_40px]">
      <div className="container">
        <div className="max-w-[650px] m-auto">
          <div className="flex flex-col items-center bg-[#4b4b4b3d] p-[15px] mb-[15px]">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => console.error("PDF load error:", err)}
              loading={<p>Loading PDF...</p>}
              error={<p className="text-red-500">Failed to load PDF.</p>}
              className="shadow-lg w-full h-full mb-[20px]"
            >
              <Page
                pageNumber={pageNumber}
                width={viewportWidth < 768 ? viewportWidth - 60 : undefined}
                className="w-full h-auto"
              />
            </Document>

            <div className="flex gap-4 items-center z-10 touch-auto relative">
              <button
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Prev
              </button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          </div>

          <Link
            href="/"
            aria-label="download spec"
            className="text-[12px] 2xl:text-[14px] 3xl:text-[16px]
           text-white bg-[#2E4C99] uppercase rounded-[50px] 
         h-[30px] 2xl:h-[35px] 3xl:h-[40px] flex items-center justify-center m-auto 
         lg:m-0 lg:ml-auto px-[10px] max-w-[140px] xl:max-w-[150px] 2xl:max-w-[180px] 
         3xl:max-w-[210px] hover:bg-[#1f3574]"
          >
            DOWNLOAD SPECS
          </Link>
        </div>
      </div>
    </section>
  );
}
