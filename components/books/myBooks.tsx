"use client"
import { useLocale } from "next-intl";
import Image from "next/image";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";
import ShowBookContent from "./ShowBookContent";
import { useState, useEffect } from "react";
import api from "@/utils/api";
import { useAuth } from "@/utils/contextapi";
import OverlayReview from "@/ui/OverlayReview";
import { useRouter } from "next/navigation";
import ScrollAnimation from "@/ui/ScrollAnimation";


interface MyBooksFetch {
    book_Id: number;
    book_Name: string;
    image_Url?: string;
    file_Path: string;
    totalReviews: number;
    reviews_Count: number;
}


const MyBooksUser: React.FC = () => {
    const local = useLocale()
    const router = useRouter()
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
            setBooks(res.data)
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

    useEffect(() => {
        if (!userData?.userId) {
            router.push(`/${local}/`)
        }
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
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
    {books.map((book, index) => {

        const normalizedRating = Math.min((book.reviews_Count || 0) / book.totalReviews, 5);
        const fullStars = Math.round(normalizedRating);

        return (
            <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="group relative dark:bg-gray-900 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden hover:-translate-y-2">

                    {/* Image Container */}
                    <div className="relative w-full h-48 dark:bg-gray-800 bg-gray-50 overflow-hidden">
                        <Image
                            src={book.image_Url || "/images/book.png"}
                            alt={book.book_Name}
                            fill
                            className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Username or Purchased Text */}
                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-(--main-color) shadow-sm">
                            {local === "ar" ? "تم الشراء" : local === "en" ? "Purchased" : "Acheté"}
                        </div>

                        {/* Overlay Actions */}
                        <div className="absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300">
                            <button
                                onClick={() => handleOpenBook(book)}
                                className="cursor-pointer bg-white text-gray-800 p-2 rounded-full hover:bg-(--main-color) hover:text-white shadow-md transition-colors"
                                title="التفاصيل"
                            >
                                <FaEye size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 text-right">
                        <h3
                            className="font-bold text-base dark:text-gray-200 text-gray-800 mb-2 truncate"
                            title={book.book_Name}
                        >
                            {book.book_Name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-(--main-color)">
                                {local === "ar" ? "تم الشراء" : local === "en" ? "Purchased" : "Acheté"}
                            </span>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <FaStar
                                        key={i}
                                        size={14}
                                        className={i < fullStars ? "text-yellow-500" : "text-gray-300"}
                                    />
                                ))}
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-200">
                                    ({book.reviews_Count || 0})
                                </span>
                            </div>
                        </div>

                        {/* Review Button */}
                        <button
                            onClick={() => handleOpenReview(book.book_Id)}
                            className="w-full mt-3 text-sm font-medium text-white dark:text-gray-200 dark:bg-gray-800 py-2 px-3 rounded-lg cursor-pointer transition hover:bg-gray-700 hover:shadow-lg bg-gray-900"
                        >
                            {local === "ar"
                                ? "إضافة تقييم"
                                : local === "en"
                                    ? "Add Review"
                                    : "Ajouter un avis"}
                        </button>
                    </div>
                </div>
            </ScrollAnimation>
        );
    })}
</div>

        </>
    )
}
export default MyBooksUser;