"use client"
import api from "@/utils/api";
import { useAuth } from "@/utils/contextapi";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";
import { usePopup } from "@/utils/popupContext";
import ScrollAnimation from "@/ui/ScrollAnimation";


interface BooksFetchingProps {
    book_Id: number;
    user_ID: number;
    book_Name: string;
    book_Description: string;
    file_Path: string;
    purchases_Count: number;
    price: number;
    image: string;
    image_Url?: string;
    user_Name: string;
    reviews_Count: number;
    totalReviews: number;
}


type Props = {
    count: string;
}
const BooksFetching: React.FC<Props> = () => {
    const local = useLocale()
    const { userData } = useAuth();
    const { showPopup } = usePopup();
    const t = useTranslations("Popup");
    const [books, setBooks] = useState<BooksFetchingProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");

    const filterSearch =
        books.filter((book) => book.book_Name.toLowerCase().includes(search.toLowerCase()))

    const getAllBooks = async () => {
        const id = userData?.userId ? userData.userId : 0; // لو موجود استخدمه، لو لأ خليه 0

        try {
            setLoading(true);
            const res = await api.get(`/api/Books/all?userId=${id}`);
            console.log(res.data);
            setBooks(res.data || []);
        } catch (error) {
            console.log(error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };


    const addToCart = async (book_Id: number, price: number, author_Id: number) => {
        try {
            if (!userData?.userId) {
                // showPopup(t("loginRequired"), () => { }, true);
                location.href = "/" + local + "/sign-in";
                return;
            }

            const response = await api.post("/api/Cart/items", {
                user_Id: userData.userId,
                book_Id: book_Id,
                author_Id: author_Id,
                price: price
            });

            console.log("Item added to cart:", response.data);
            showPopup(t("addToCartSuccess"), () => { });
        } catch (error) {
            console.error("Error adding to cart:", error);
            showPopup(t("addToCartError"), () => { }, true);
        }
    }

    useEffect(() => {
        getAllBooks()
    }, [])

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">جاري التحميل...</p>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">لا توجد كتب متاحة</p>
            </div>
        );
    }

    //     if (count !== "success") {
    //         return (
    //             <>
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
    //     {books.slice(0, 4).map((book, index) => {

    //         // === ⭐ Normalize Rating (always max 5 stars) ===
    //         const normalizedRating = Math.min(book.reviews_Count / 2, 5);
    //         const fullStars = Math.round(normalizedRating);

    //         return (
    //             <ScrollAnimation key={index} delay={index * 0.1}>
    //                 <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-2">

    //                     {/* === Image === */}
    //                     <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
    //                         <Image
    //                             src={book.image || book.image_Url || "/book.png"}
    //                             alt={book.book_Name}
    //                             fill
    //                             className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
    //                         />

    //                         <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-(--main-color) shadow-sm">
    //                             {book.user_Name || "—"}
    //                         </div>

    //                         {/* Actions */}
    //                         <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //                             <button
    //                                 onClick={() => addToCart(book.book_Id, book.price)}
    //                                 className="cursor-pointer bg-white text-gray-800 p-2 rounded-full hover:bg-(--main-color) hover:text-white shadow-md transition-colors"
    //                             >
    //                                 <FaCartPlus size={16} />
    //                             </button>

    //                             <Link href={`/${local}/books/${book.book_Id}`}>
    //                                 <button className="cursor-pointer bg-white text-gray-800 p-2 rounded-full hover:bg-(--main-color) hover:text-white shadow-md transition-colors">
    //                                     <FaEye size={16} />
    //                                 </button>
    //                             </Link>
    //                         </div>
    //                     </div>

    //                     {/* === Card Body === */}
    //                     <div className="p-4 text-right">
    //                         <h3 className="font-bold text-lg text-gray-800 mb-2 truncate" title={book.book_Name}>
    //                             {book.book_Name}
    //                         </h3>

    //                         <div className="flex items-center justify-between">

    //                             {/* Price */}
    //                             <span className="text-lg font-bold text-(--main-color)">
    //                                 {book.price} {local === "ar" ? "ج.م" : "EGP"}
    //                             </span>

    //                             {/* ⭐ Rating */}
    //                             <div className="flex items-center gap-1">
    //                                 {Array.from({ length: 5 }).map((_, i) => (
    //                                     <FaStar
    //                                         key={i}
    //                                         size={16}
    //                                         className={`${i < fullStars ? "text-yellow-500" : "text-gray-400"}`}
    //                                     />
    //                                 ))}

    //                                 <span className="text-xs font-medium text-gray-500">
    //                                     {book.reviews_Count}
    //                                 </span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </ScrollAnimation>
    //         );
    //     })}
    // </div>

    //             </>
    //         )
    //     }

    return (
        <>

            <div>
                <input
                    type="text"
                    placeholder={`${t("search")}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full py-2 px-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-(--main-color)"
                />
            </div>


            {filterSearch.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">لا توجد نتائج للبحث</p>
                </div>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {filterSearch.map((book, index) => {
                        const normalizedRating = Math.min(book.reviews_Count / book.totalReviews, 5);
                        const fullStars = Math.round(normalizedRating);
                        // const reating = book.totalReviews / book.reviews_Count;

                        return (
                            <ScrollAnimation key={index} delay={index * 0.1}>
                                <div className="group relative dark:bg-gray-900 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden hover:-translate-y-2">
                                    <div className="relative w-full h-48 dark:bg-gray-800 bg-gray-50 overflow-hidden">
                                        <Image
                                            src={book.image || book.image_Url || "/book.png"}
                                            alt={book.book_Name}
                                            fill
                                            className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-(--main-color) shadow-sm">
                                            {book.user_Name || "—"}
                                        </div>

                                        {/* Overlay Actions */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300">
                                            <button
                                                onClick={() => addToCart(book.book_Id, book.price, book.user_ID)}
                                                className="cursor-pointer bg-white text-gray-800 p-2 rounded-full hover:bg-(--main-color) hover:text-white shadow-md transition-colors"
                                                title="أضف للسلة"
                                            >
                                                <FaCartPlus size={16} />
                                            </button>
                                            <Link href={`/${local}/books/${book.book_Id}`}>
                                                <button
                                                    className="cursor-pointer bg-white text-gray-800 p-2 rounded-full hover:bg-(--main-color) hover:text-white shadow-md transition-colors"
                                                    title="التفاصيل"
                                                >
                                                    <FaEye size={16} />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="p-4 text-right">
                                        <h3 className="font-bold text-base dark:text-gray-200 text-gray-800 mb-2 truncate" title={book.book_Name}>
                                            {book.book_Name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-bold text-(--main-color)">
                                                {book.price} {local === "ar" ? "ج.م" : "EGP"}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        size={14}
                                                        className={i < fullStars ? "text-yellow-500" : "text-gray-300"}
                                                    />
                                                ))}
                                                <span className="text-xs font-medium text-gray-500">
                                                    ({book.reviews_Count})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        );
                    })}
                </div>

            )}

        </>
    )
}
export default BooksFetching;