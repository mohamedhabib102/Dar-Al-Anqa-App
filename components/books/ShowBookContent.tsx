'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { IoClose } from "react-icons/io5";

// Correct CSS imports for react-pdf v9+
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import "pdfjs-dist/web/pdf_viewer.css";

// Dynamically import Document and Page to avoid SSR issues
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

interface Book {
    book_Id: number;
    file_Path: string;
}

interface ShowBookContentProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    book: Book;
}

const ShowBookContent: React.FC<ShowBookContentProps> = ({ toggle, setToggle, book }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageDimensions, setPageDimensions] = useState<{ width?: number; height?: number }>({ height: 600 });

    // Configure worker dynamically on client side
    useEffect(() => {
        const setupWorker = async () => {
            if (typeof window !== 'undefined') {
                try {
                    const { pdfjs } = await import('react-pdf');
                    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
                } catch (error) {
                    console.error("Failed to load pdfjs worker:", error);
                }
            }
        };
        setupWorker();
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }



    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateDimensions = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                // Check if mobile (e.g., width < 768px)
                if (width < 768) {
                    // On mobile: Fit width (95% of screen width)
                    setPageDimensions({ width: width * 0.95 });
                } else {
                    // On desktop: Fit height (85% of screen height)
                    setPageDimensions({ height: height * 0.85 });
                }
            };

            updateDimensions();
            window.addEventListener('resize', updateDimensions);
            return () => window.removeEventListener('resize', updateDimensions);
        }
    }, []);

    const pdfUrl = book.file_Path ? `/api/proxy-pdf?url=${encodeURIComponent(book.file_Path)}` : null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setToggle(false)}
            ></div>

            {/* Modal Content */}
            <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-300 w-full h-full pointer-events-none ${toggle ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                <div className={`flex flex-col items-center w-full max-w-5xl h-full max-h-screen p-4 ${toggle ? "pointer-events-auto" : ""}`}>
                    {/* Top Bar: Page Info & Close */}
                    <div className="w-full flex justify-end items-center mb-4 text-white">
                        <button
                            onClick={() => setToggle(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                        >
                            <IoClose size={30} />
                        </button>
                    </div>

                    {/* PDF Viewer Container */}
                    <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">

                        {/* Scrollable Area for PDF */}
                        <div className="w-full h-full overflow-auto flex justify-center custom-scrollbar">
                            {toggle && pdfUrl && (
                                <Document
                                    file={pdfUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    className="flex flex-col items-center gap-4 py-4"
                                    loading={<div className="text-white text-xl mt-10">Loading PDF...</div>}
                                    error={<div className="text-red-400 text-xl mt-10">Failed to load PDF.</div>}
                                >
                                    {numPages && Array.from(new Array(numPages), (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                            {...pageDimensions}
                                            className="shadow-2xl mb-4"
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                        />
                                    ))}
                                </Document>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowBookContent;
