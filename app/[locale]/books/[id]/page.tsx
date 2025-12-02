"use client"
import Header from "@/layout/Header";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import CommentsRatings from "@/components/books/CommentsRatings";
import api from "@/utils/api";
import { useAuth } from "@/utils/contextapi";
import { useEffect, useState } from "react";
import { usePopup } from "@/utils/popupContext";
import ScrollAnimation from "@/ui/ScrollAnimation";

// Book interface
interface Book {
    book_Id: number;
    user_ID: string;
    book_Name: string;
    book_Description: string;
    file_Path: string;
    purchases_Count: number;
    price: number;
    image_Url: string;
    reviews_Count: number;
    user_Name: string;
}

const BookById: React.FC = () => {
    const params = useParams();
    const t = useTranslations("bookDetails");
    const tPopup = useTranslations("Popup");
    const bookId = Number(params.id);
    const local = useLocale();
    const { userData } = useAuth();
    const { showPopup } = usePopup();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getAllBooks = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/Books/all");
            const foundBook = res.data?.find((b: Book) => b.book_Id === bookId);
            setBook(foundBook || null);
        } catch (error) {
            console.log(error);
            setBook(null);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async () => {
        try {
            if (!userData?.userId) {
                showPopup(tPopup("loginRequired"), () => { }, true);
                return;
            }

            if (!book) return;

            const response = await api.post("/api/Cart/items", {
                user_Id: userData.userId,
                book_Id: book.book_Id,
                author_Id: book.user_ID,
                price: book.price
            });
            showPopup(tPopup("addToCartSuccess"), () => { });
        } catch (error) {
            console.error("Error adding to cart:", error);
            showPopup(tPopup("addToCartError"), () => { }, true);
        }
    };

    useEffect(() => {
        getAllBooks();
    }, [bookId]);

    // Loading state
    if (loading) {
        return (
            <>
                <Header />
                <div className="py-16">
                    <CustomContainer>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-500">جاري التحميل...</p>
                        </div>
                    </CustomContainer>
                </div>
            </>
        );
    }

    // If book not found
    if (!book) {
        return (
            <>
                <Header />
                <div className="py-16">
                    <CustomContainer>
                        <h1 className="text-2xl font-bold text-center">الكتاب غير موجود</h1>
                    </CustomContainer>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="py-16">
                <CustomContainer>
                    <CustomTitle
                        title={t("title")}
                        description={t("description")}
                        success={false}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Book Image */}
                        <ScrollAnimation delay={0}>
                            <div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-lg">
                                <Image
                                    src={book.image_Url || "/images/book.png"}
                                    alt={book.book_Name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </ScrollAnimation>

                        {/* Book Details */}
                        <ScrollAnimation delay={0.2}>
                            <div className="flex flex-col justify-center gap-6">
                                <h1 className="text-4xl font-bold dark:text-white text-gray-800">{book.book_Name}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg text-gray-600 dark:text-gray-400">{t("author")}:</span>
                                    <span className="text-xl font-semibold text-(--main-color)">{book.user_Name || "غير محدد"}</span>
                                </div>
                                <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">{book.book_Description}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg text-gray-600">{t("purchasesCount")}:</span>
                                    <span className="text-xl font-semibold text-(--main-color)">{book.purchases_Count}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-bold text-(--main-color)">{book.price} {local === "ar" ? "ج.م" : local === "en" ? "USD" : "€"}</span>
                                </div>
                                <button
                                    onClick={addToCart}
                                    className="w-full md:w-auto px-8 py-4 bg-(--main-color) text-white rounded-lg font-bold text-lg hover:opacity-90 transition cursor-pointer"
                                >
                                    {t("addToCart")}
                                </button>
                            </div>
                        </ScrollAnimation>
                    </div>
                    <ScrollAnimation delay={0.4}>
                        <CommentsRatings book_id={bookId} />
                    </ScrollAnimation>
                </CustomContainer>
            </div>
        </>
    );
};
export default BookById;