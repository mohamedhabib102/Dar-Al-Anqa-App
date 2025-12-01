"use client"

import CustomTitle from "@/ui/CustomTitle";
import api from "@/utils/api";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaBook, FaDollarSign, FaUser, FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import ShowBookContent from "@/components/books/ShowBookContent";
import { AxiosError } from "axios";
import Image from "next/image";


interface PendingBook {
    book_Id: number;
    user_ID: number;
    book_Name: string;
    book_Description: string;
    file_Path: string;
    price: number;
    is_Accepted: boolean;
    purchases_Count: number;
    reviews_Count: number;
    image_Url: string;
}

const PendingBooks: React.FC = () => {
    const [books, setBooks] = useState<PendingBook[]>([]);
    const [showBookToggle, setShowBookToggle] = useState(false);
    const [selectedBook, setSelectedBook] = useState<PendingBook | null>(null);
    const t = useTranslations("Dashboard");

    const getPendingBooks = async () => {
        try {
            const res = await api.get("/api/Books/pending-approval");
            setBooks(res.data);
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 404) {
                setBooks([]);
            }
        }
    };

    const handleApprove = async (bookId: number) => {
        try {
            await api.put(`/api/Books/${bookId}/approve`);
            // Refresh the list
            getPendingBooks();
        } catch (error) {
            console.log(error);
        }
    };

    const handleReject = async (bookId: number) => {
        try {
            await api.put(`/api/Books/${bookId}/reject`);
            // Refresh the list
            getPendingBooks();
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewBook = (book: PendingBook) => {
        setSelectedBook(book);
        setShowBookToggle(true);
    };

    useEffect(() => {
        getPendingBooks();
    }, []);

    return (
        <>
            <CustomTitle
                title={t("pendingBooks.title")}
                description={t("pendingBooks.description")}
                success={false}
            />

            <div className="space-y-4">
                {books.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <FaBook className="mx-auto text-6xl text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">
                            {t("pendingBooks.noBooks")}
                        </p>
                    </div>
                ) : (
                    books.map((book) => (
                        <div
                            key={book.book_Id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-r-4 border-(--main-color)"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                                {/* Book ID */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-(--main-color) flex items-center justify-center text-white font-bold text-lg">
                                        #{book.book_Id}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {t("pendingBooks.bookId")}
                                        </p>
                                        <p className="font-semibold text-gray-800">{book.book_Id}</p>
                                    </div>
                                </div>

                                {/* Book Name */}
                                <div className="flex items-center gap-3">
                                    {/* <FaBook className="text-(--main-color) text-2xl" /> */}
                                    <Image
                                        src={book.image_Url || "/book.png"}
                                        alt={book.book_Name}
                                        width={50}
                                        height={50}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {t("pendingBooks.bookName")}
                                        </p>
                                        <p className="font-semibold text-gray-800 truncate max-w-[200px]" title={book.book_Name}>
                                            {book.book_Name}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="flex items-center gap-3">
                                    <div className="w-full">
                                        <p className="text-xs text-gray-500">
                                            {t("pendingBooks.bookDescription")}
                                        </p>
                                        <p className="text-sm text-gray-700 line-clamp-2" title={book.book_Description}>
                                            {book.book_Description}
                                        </p>
                                    </div>
                                </div>

                                {/* User ID */}
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-(--main-color) text-2xl" />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {t("pendingBooks.userId")}
                                        </p>
                                        <p className="font-semibold text-gray-800">{book.user_ID}</p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-3">
                                    <FaDollarSign className="text-(--main-color) text-2xl" />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {t("pendingBooks.price")}
                                        </p>
                                        <p className="font-semibold text-gray-800">{book.price}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => handleViewBook(book)}
                                        className="cursor-pointer flex items-center gap-2 bg-(--main-color) hover:bg-[#8b7a26] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <FaEye />
                                        {t("view")}
                                    </button>
                                    <button
                                        onClick={() => handleApprove(book.book_Id)}
                                        className="cursor-pointer flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <FaCheckCircle />
                                        {t("pendingBooks.approve")}
                                    </button>
                                    <button
                                        onClick={() => handleReject(book.book_Id)}
                                        className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <FaTimesCircle />
                                        {t("pendingBooks.reject")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedBook && (
                <ShowBookContent
                    toggle={showBookToggle}
                    setToggle={setShowBookToggle}
                    book={selectedBook}
                />
            )}
        </>
    );
};

export default PendingBooks;
