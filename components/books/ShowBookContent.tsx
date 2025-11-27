'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

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
    const [pageNumber, setPageNumber] = useState<number>(1);
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
        if (toggle) setPageNumber(1);
    }, [toggle, book]);

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
                    <div className="w-full flex justify-between items-center mb-4 text-white">
                        <div className="text-xl font-medium">
                            {numPages ? `${pageNumber} / ${numPages}` : ''}
                        </div>
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
                        <div className="w-full h-full overflow-auto flex justify-center items-center custom-scrollbar">
                            {toggle && (
                                <Document
                                    file={book.file_Path ? book.file_Path : "/book.pdf"}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    className="flex justify-center items-center"
                                    loading={<div className="text-white text-xl">Loading PDF...</div>}
                                    error={<div className="text-red-400 text-xl">Failed to load PDF.</div>}
                                >
                                    <Page
                                        pageNumber={pageNumber}
                                        {...pageDimensions}
                                        className="shadow-2xl"
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                </Document>
                            )}
                        </div>

                        {/* Navigation Buttons (Fixed Overlay) */}
                        <button
                            disabled={pageNumber <= 1}
                            onClick={(e) => { e.stopPropagation(); setPageNumber(prev => prev - 1); }}
                            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-0 disabled:cursor-default transition-all z-10 cursor-pointer"
                        >
                            <IoChevronBack size={30} />
                        </button>

                        <button
                            disabled={pageNumber >= (numPages || 0)}
                            onClick={(e) => { e.stopPropagation(); setPageNumber(prev => prev + 1); }}
                            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 disabled:opacity-0 disabled:cursor-default transition-all z-10 cursor-pointer"
                        >
                            <IoChevronForward size={30} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowBookContent;
