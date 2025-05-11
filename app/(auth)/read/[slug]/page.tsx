// app/(auth)/read/[slug]/page.tsx
"use client";

import { useState, useEffect, use } from "react";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PdfWorkerLoader from "@/components/PdfWorkerLoader";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function ReadBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const searchParams = useSearchParams();
  const { slug } = use(params);
  const [pdfUrl, setPdfUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Create custom toolbar plugin directly in component
  const customToolbarPlugin = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          const {
            CurrentPageInput,
            EnterFullScreen,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            Zoom,
            ZoomIn,
            ZoomOut,
            SwitchTheme,
          } = slots;

          return (
            <div className="flex items-center justify-between w-full px-2 py-1">
              {/* Left side - Search and Zoom */}
              <div className="flex items-center space-x-1">
                <div className="pdf-toolbar-button">
                  <ZoomIn />
                </div>
                <div className="pdf-toolbar-button">
                  <ZoomOut />
                </div>
                <div className="pdf-toolbar-button">
                  <Zoom />
                </div>
                <div className="pdf-toolbar-button">
                  <ZoomIn />
                </div>
              </div>

              {/* Center - Page Navigation */}
              <div className="flex items-center space-x-1">
                <div className="pdf-toolbar-button">
                  <GoToPreviousPage />
                </div>
                <div className="flex items-center px-2 text-sm">
                  <CurrentPageInput />
                  <span className="mx-1">/</span>
                  <NumberOfPages />
                </div>
                <div className="pdf-toolbar-button">
                  <GoToNextPage />
                </div>
              </div>

              {/* Right side - Fullscreen */}
              <div className="flex items-center">
                <div className="pdf-toolbar-button">
                  <EnterFullScreen />
                </div>
                <div className="pdf-toolbar-button">
                  <SwitchTheme />
                </div>
              </div>
            </div>
          );
        }}
      </Toolbar>
    ),
  });

  const isPreview = searchParams.get("preview") === "true";
  const maxPreviewPages = 20;

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/book-pdf?slug=${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch PDF");
        }

        const data = await response.json();
        if (!data.url) {
          throw new Error("PDF not found");
        }

        setPdfUrl(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load PDF");
        console.error("PDF load error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdfUrl();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          <p className="font-medium">{error}</p>
          <Link
            href={`/books/${slug}`}
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Return to book details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 h-[calc(100vh-200px)]">
        <PdfWorkerLoader>
          {pdfUrl && (
            <Viewer
              fileUrl={pdfUrl}
              plugins={[customToolbarPlugin]}
              initialPage={0}
              defaultScale={SpecialZoomLevel.PageFit}
              transformGetDocumentParams={(options) => ({
                ...options,
                ...(isPreview ? { range: { length: maxPreviewPages } } : {}),
              })}
            />
          )}
        </PdfWorkerLoader>
      </div>

      {isPreview && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Preview limited to first {maxPreviewPages} pages.{" "}
                <Link
                  href={`/books/${slug}`}
                  className="font-medium text-yellow-700 hover:text-yellow-600 underline"
                >
                  Borrow the book
                </Link>{" "}
                to read the full content.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
