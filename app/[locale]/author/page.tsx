"use client"
import AddNewBook from "@/components/dashboard/AddNewBook"
import Header from "@/layout/Header"
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import { useAuth } from "@/utils/contextapi"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { FaPlus, FaBook, FaCheckCircle, FaClock, FaDollarSign, FaShoppingCart, FaEye } from "react-icons/fa"
import Image from "next/image"
import api from "@/utils/api"
import ShowBookContent from "@/components/books/ShowBookContent"

interface AuthorBook {
    book_Id: number;
    user_ID: number;
    user_Name: string;
    book_Name: string;
    book_Description: string;
    image_Url: string;
    file_Path: string;
    price: number;
    is_Accepted: boolean;
    purchases_Count: number;
    reviews_Count: number;
}

const Author: React.FC = () => {
    const locale = useLocale()
    const t = useTranslations("AuthorPage");
    const [toggle, setToggle] = useState<boolean>(false)
    const [isMounted, setIsMounted] = useState(false);
    const { userData } = useAuth()
    const [books, setBooks] = useState<AuthorBook[]>([]);
    const [showBookToggle, setShowBookToggle] = useState(false);
    const [selectedBook, setSelectedBook] = useState<AuthorBook | null>(null);

    const getAuthorBooks = async () => {
        if (!userData?.userId) return;
        try {
            const res = await api.get(`/api/Books/GetAllBooksByAuthor?User_ID=${userData.userId}`);
            setBooks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewBook = (book: AuthorBook) => {
        setSelectedBook(book);
        setShowBookToggle(true);
    };

    useEffect(() => {
        setIsMounted(true);
        if (userData?.userId) {
            getAuthorBooks();
        }
    }, [userData?.userId]);



    /*
    GGG
    01024748554
    BmmggghH7000
    */

    return (
        <>
            <AddNewBook
                toggle={toggle}
                setToggle={setToggle}
                pathLink="/api/Books"
                getBooks={getAuthorBooks}
            />
            <Header />
            <section className="py-16 bg-gray-50 min-h-screen">
                <CustomContainer>
                    <CustomTitle
                        title={t("title")}
                        description={t("description")}
                        success={true}
                    />
                    {isMounted && userData?.isAccepted && (
                        <div className="mb-8 flex justify-end">
                            <button
                                onClick={() => setToggle(!toggle)}
                                className="flex items-center gap-2 transition duration-300 cursor-pointer bg-(--main-color) text-white px-6 py-3 rounded-lg hover:bg-[#8b7a26] font-bold shadow-lg hover:shadow-xl"
                            >
                                <FaPlus />
                                {t("addNewBook")}
                            </button>
                        </div>
                    )}

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">{t("myBooks")}</h3>
                        {books.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow">
                                <FaBook className="mx-auto text-6xl text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">{t("noBooks")}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {books.map((book) => (
                                    <div key={book.book_Id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                        <div className="relative h-64 w-full">
                                            <Image
                                                src={book.image_Url || "/book.png"}
                                                alt={book.book_Name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-(--main-color) shadow-sm">
                                                {book.is_Accepted ? <FaCheckCircle className="text-green-500 inline mr-1" /> : <FaClock className="text-yellow-500 inline mr-1" />}
                                                {book.is_Accepted ? (locale === "ar" ? "مقبول" : "Accepted") : (locale === "ar" ? "قيد المراجعة" : "Pending")}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-800 mb-2 truncate" title={book.book_Name}>{book.book_Name}</h4>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{book.book_Description}</p>

                                            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><FaDollarSign className="text-(--main-color)" /> {book.price}</span>
                                                <span className="flex items-center gap-1"><FaShoppingCart className="text-(--main-color)" /> {book.purchases_Count}</span>
                                            </div>

                                            <button
                                                onClick={() => handleViewBook(book)}
                                                className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg transition-colors font-medium"
                                            >
                                                <FaEye />
                                                {t("view")}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CustomContainer>
            </section>

            {selectedBook && (
                <ShowBookContent
                    toggle={showBookToggle}
                    setToggle={setShowBookToggle}
                    book={selectedBook}
                />
            )}
        </>
    )
}
export default Author