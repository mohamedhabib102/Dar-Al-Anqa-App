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
    user_ID: string;
    book_Name: string;
    book_Description: string;
    file_Path: string;
    purchases_Count: number;
    price: number;
    image: string;
    image_Url?: string;
    user_Name: string;
    reviews_Count: number
}


type Props = {
    count: string;
}
const BooksFetching: React.FC<Props> = ({ count }) => {
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
        try {
            setLoading(true);
            const res = await api.get("/api/Books/all")
            console.log(res.data);
            setBooks(res.data || []);
        } catch (error) {
            console.log(error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }

    const addToCart = async (book_Id: number, price: number) => {
        try {
            if (!userData?.userId) {
                showPopup(t("loginRequired"), () => { });
                return;
            }

            const response = await api.post("/api/Cart/items", {
                user_Id: userData.userId,
                book_Id: book_Id,
                price: price
            });

            console.log("Item added to cart:", response.data);
            showPopup(t("addToCartSuccess"), () => { });
        } catch (error) {
            console.error("Error adding to cart:", error);
            showPopup(t("addToCartError"), () => { });
        }
    }

    useEffect(() => {
        getAllBooks()
    }, [])

    const displayBooks = count === "success" ? books : books.slice(0, 4);

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


    if (count !== "success"){
        return(
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {filterSearch.slice(0, 4).map((book, index) => (
                        <ScrollAnimation key={book.book_Id} delay={index * 0.1}>
                            <div className="book-card custom_scale  bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
                                <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={book.image || book.image_Url || "/book.png"}
                                        alt={book.book_Name}
                                        fill
                                        className="object-cover transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-(--main-color) shadow-sm">
                                        {book.user_Name || "—"}
                                    </div>

                                    {/* Overlay Actions */}
                                    <div className="absolute top-3 right-3 flex items-center flex-col gap-3">
                                        <button
                                            onClick={() => addToCart(book.book_Id, book.price)}
                                            className="cursor-pointer bg-white text-gray-800 p-3 rounded-full transition hover:bg-(--main-color) hover:text-white shadow-lg"
                                            title="أضف للسلة"
                                        >
                                            <FaCartPlus size={18}
                                            />
                                        </button>
                                        <Link href={`/${local}/books/${book.book_Id}`}>
                                            <button className="cursor-pointer bg-white text-gray-800 p-3 rounded-full transition hover:bg-(--main-color) hover:text-white shadow-lg" title="التفاصيل">
                                                <FaEye size={18}
                                                />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-4 text-right">
                                    <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{book.book_Name}</h3>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-xl font-bold text-(--main-color)">{book.price}  {local === "ar" ? "ج.م" : local === "en" ? "USD" : "€"} </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-medium text-gray-500">{book.reviews_Count}</span>
                                            <FaStar
                                                size={20}
                                                className="text-yellow-500 transition text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                ))}
                </div>
            </>
        )
    }

    return (
        <>
            {count === "success" && (
                <div>
                    <input
                        type="text"
                        placeholder={`${t("search")}`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-2 px-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-(--main-color)"
                    />
                </div>
            )}



            {filterSearch.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">لا توجد نتائج للبحث</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {filterSearch.map((book, index) => (
                        <ScrollAnimation key={book.book_Id} delay={index * 0.1}>
                            <div className="book-card custom_scale  bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
                                <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={book.image || book.image_Url || "/book.png"}
                                        alt={book.book_Name}
                                        fill
                                        className="object-cover transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-(--main-color) shadow-sm">
                                        {book.user_Name || "—"}
                                    </div>

                                    {/* Overlay Actions */}
                                    <div className="absolute top-3 right-3 flex items-center flex-col gap-3">
                                        <button
                                            onClick={() => addToCart(book.book_Id, book.price)}
                                            className="cursor-pointer bg-white text-gray-800 p-3 rounded-full transition hover:bg-(--main-color) hover:text-white shadow-lg"
                                            title="أضف للسلة"
                                        >
                                            <FaCartPlus size={18}
                                            />
                                        </button>
                                        <Link href={`/${local}/books/${book.book_Id}`}>
                                            <button className="cursor-pointer bg-white text-gray-800 p-3 rounded-full transition hover:bg-(--main-color) hover:text-white shadow-lg" title="التفاصيل">
                                                <FaEye size={18}
                                                />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-4 text-right">
                                    <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{book.book_Name}</h3>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-xl font-bold text-(--main-color)">{book.price}  {local === "ar" ? "ج.م" : local === "en" ? "USD" : "€"} </span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-medium text-gray-500">{book.reviews_Count}</span>
                                            <FaStar
                                                size={20}
                                                className="text-yellow-500 transition text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>)}

        </>
    )
}
export default BooksFetching;