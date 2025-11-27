"use client"

import CustomTitle from "@/ui/CustomTitle";
import api from "@/utils/api";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { FaBook, FaDollarSign, FaUser, FaCheckCircle, FaTimesCircle } from "react-icons/fa";


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
}

const PendingBooks: React.FC = () => {
    const [books, setBooks] = useState<PendingBook[]>([]);
    const locale = useLocale();

    const getPendingBooks = async () => {
        try {
            const res = await api.get("/api/Books/pending-approval");
            setBooks(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
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

    useEffect(() => {
        getPendingBooks();
    }, []);

    return (
        <>
            <CustomTitle
                title={locale === "ar" ? "الكتب المعلقة" : locale === "en" ? "Pending Books" : "Livres en attente"}
                description={locale === "ar" ? "مراجعة والموافقة على الكتب المعلقة" : locale === "en" ? "Review and approve pending books" : "Examiner et approuver les livres en attente"}
                success={false}
            />

            <div className="space-y-4">
                {books.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <FaBook className="mx-auto text-6xl text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">
                            {locale === "ar" ? "لا توجد كتب معلقة" : locale === "en" ? "No pending books" : "Aucun livre en attente"}
                        </p>
                    </div>
                ) : (
                    books.map((book) => (
                        <div
                            key={book.book_Id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-r-4 border-(--main-color)"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
                                {/* Book ID */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-(--main-color) flex items-center justify-center text-white font-bold text-lg">
                                        #{book.book_Id}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {locale === "ar" ? "معرف الكتاب" : locale === "en" ? "Book ID" : "ID du livre"}
                                        </p>
                                        <p className="font-semibold text-gray-800">{book.book_Id}</p>
                                    </div>
                                </div>

                                {/* Book Name */}
                                <div className="flex items-center gap-3">
                                    <FaBook className="text-(--main-color) text-2xl" />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {locale === "ar" ? "اسم الكتاب" : locale === "en" ? "Book Name" : "Nom du livre"}
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
                                            {locale === "ar" ? "الوصف" : locale === "en" ? "Description" : "Description"}
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
                                            {locale === "ar" ? "معرف المستخدم" : locale === "en" ? "User ID" : "ID utilisateur"}
                                        </p>
                                        <p className="font-semibold text-gray-800">{book.user_ID}</p>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-3">
                                    <FaDollarSign className="text-(--main-color) text-2xl" />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            {locale === "ar" ? "السعر" : locale === "en" ? "Price" : "Prix"}
                                        </p>
                                        <p className="font-semibold text-gray-800">{book.price}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => handleApprove(book.book_Id)}
                                        className="cursor-pointer flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <FaCheckCircle />
                                        {locale === "ar" ? "قبول" : locale === "en" ? "Approve" : "Approuver"}
                                    </button>
                                    <button
                                        onClick={() => handleReject(book.book_Id)}
                                        className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <FaTimesCircle />
                                        {locale === "ar" ? "رفض" : locale === "en" ? "Reject" : "Rejeter"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default PendingBooks;
