"use client"
import { useLocale } from "next-intl";
import Image from "next/image";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";
import ShowBookContent from "./ShowBookContent";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useAuth } from "@/utils/contextapi";
import OverlayReview from "@/ui/OverlayReview";


interface MyBooksFetch {
    book_Id: number;
    book_Name: string;
    image?: string;
    file_Path: string;
    reviews_Count: number;
}


const MyBooksUser: React.FC = () => {
    const local = useLocale()
    const { userData } = useAuth()
    const [toggle, setToggle] = useState(false)
    const [reviewToggle, setReviewToggle] = useState(false)
    const [selectedBookForReview, setSelectedBookForReview] = useState<number | null>(null)
    const [books, setBooks] = useState<MyBooksFetch[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedBook, setSelectedBook] = useState<MyBooksFetch | null>(null)

    const getMyBooks = async () => {
        if (!userData?.userId) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const res = await api.get(`/api/Books/GetMyBooks?userId=${userData.userId}`)
            console.log(res.data)
            // Add default values for missing fields
            const booksWithDefaults = (res.data || []).map((book: any) => ({
                ...book,
                author: book.author || (local === "ar" ? "غير محدد" : local === "en" ? "Unknown" : "Inconnu"),
                image: book.image || "/images/book.png",
                price: book.price || 0,
                file_Path: book.file_Path
            }))
            setBooks(booksWithDefaults)
            if (booksWithDefaults.length > 0 && !selectedBook) {
                setSelectedBook(booksWithDefaults[0])
            }
        } catch (error) {
            console.log(error)
            setBooks([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMyBooks()
    }, [userData?.userId])

    const handleOpenBook = (book: MyBooksFetch) => {
        setSelectedBook(book);
        setToggle(true);
    };

    const handleOpenReview = (book_Id: number) => {
        setSelectedBookForReview(book_Id);
        setReviewToggle(true);
    };

    const handleReviewAdded = () => {
        // Refresh books to update reviews count
        getMyBooks();
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                    {local === "ar" ? "جاري التحميل..." : local === "en" ? "Loading..." : "Chargement..."}
                </p>
            </div>
        )
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                    {local === "ar" ? "لا توجد كتب متاحة" : local === "en" ? "No books available" : "Aucun livre disponible"}
                </p>
            </div>
        )
    }

    return (
        <>
            {selectedBook && (
                <ShowBookContent
                    toggle={toggle}
                    setToggle={setToggle}
                    book={selectedBook}
                />
            )}
            {selectedBookForReview && (
                <OverlayReview
                    toggle={reviewToggle}
                    setToggle={setReviewToggle}
                    book_Id={selectedBookForReview}
                    onReviewAdded={handleReviewAdded}
                />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {books.map((book) => (
                    <div key={book.book_Id} className="book-card custom_scale  bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
                        <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
                            <Image
                                src={book.image || "/images/book.png"}
                                alt={book.book_Name}
                                fill
                                className="object-cover transition-transform duration-500"
                            />

                            {/* Overlay Actions */}
                            <div className="absolute top-3 right-3 flex items-center flex-col gap-3">
                                <button
                                    onClick={() => handleOpenBook(book)}
                                    className="cursor-pointer bg-white text-gray-800 p-3 rounded-full transition hover:bg-(--main-color) hover:text-white shadow-lg" title="التفاصيل">
                                    <FaEye size={18}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 text-right">
                            <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{book.book_Name}</h3>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-xl font-bold text-(--main-color)">{local === "ar" ? "تم الشراء" : local === "en" ? "Purchased" : "Acheté"}</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium text-gray-500">{book.reviews_Count || 0}</span>
                                    <FaStar
                                        size={20}
                                        className="text-yellow-500 transition text-xs"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => handleOpenReview(book.book_Id)}
                                className="w-full mt-3 text-sm font-medium text-white py-2 px-3 rounded-lg cursor-pointer transition hover:bg-gray-700 hover:shadow-lg bg-gray-900"
                            >
                                {local === "ar" ? "إضافة تقييم" : local === "en" ? "Add Review" : "Ajouter un avis"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default MyBooksUser;