"use client"

import AddNewBook from "@/components/dashboard/AddNewBook";
import CustomTitle from "@/ui/CustomTitle";
import api from "@/utils/api";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus, FaBook, FaDollarSign, FaUser } from "react-icons/fa";


interface Books {
    book_Id: number,
    user_ID: number,
    book_Name: string,
    book_Description: string,
    file_Path: string,
    price: number;
    image_Url: string;
}

const BooksDashboard: React.FC = () => {
    const [books, setBooks] = useState<Books[]>([]);
    const [toggle, setToggle] = useState<boolean>(false)
    const locale = useLocale()

    const getAllBooks = async () => {
        try {
            const res = await api.get("/api/Books/all")
            console.log(res.data);
            setBooks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBooks()
    }, [])

    return (
        <>
            <AddNewBook
                toggle={toggle}
                setToggle={setToggle}
                pathLink="api/books"
                getBooks={getAllBooks}
            />

            <CustomTitle
                title={locale === "ar" ? "إدارة الكتب" : locale === "en" ? "Manage Books" : "Gérer les livres"}
                description={locale === "ar" ? "عرض وإدارة جميع الكتب المتاحة في المنصة" : locale === "en" ? "View and manage all available books on the platform" : "Afficher et gérer tous les livres disponibles sur la plateforme"}
                success={false}
            />

            <div className="mb-6 flex justify-end">
                <button
                    onClick={() => setToggle(!toggle)}
                    className="flex items-center gap-2 transition duration-300 cursor-pointer bg-(--main-color) text-white px-6 py-3 rounded-lg hover:bg-(--main-color-rgb) font-bold shadow-lg hover:shadow-xl"
                >
                    <FaPlus />
                    {locale === "ar" ? "إضافة كتاب جديد" : locale === "en" ? "Add New Book" : "Ajouter un nouveau livre"}
                </button>
            </div>

            <div className="dark:bg-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white dark:bg-gray-900 rounded-lg shadow">
                        <FaBook className="mx-auto text-6xl text-gray-300 dark:text-white mb-4" />
                        <p className="text-gray-500 dark:text-white text-lg">
                            {locale === "ar" ? "لا توجد كتب متاحة" : locale === "en" ? "No books available" : "Aucun livre disponible"}
                        </p>
                    </div>
                ) : (
                    books.map((book, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                        >
                            {/* Book Image */}
                            <div className="relative h-64 w-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                {/* <FaBook className="text-6xl text-gray-400" /> */}
                                <Image
                                    src={book.image_Url}
                                    alt={book.book_Name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Book Details */}
                            <div className="p-4 dark:bg-gray-900">
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 truncate" title={book.book_Name}>
                                    {book.book_Name}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-white mb-3 line-clamp-2" title={book.book_Description}>
                                    {book.book_Description}
                                </p>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaUser className="text-(--main-color)" />
                                        <span>{locale === "ar" ? "معرف المستخدم": locale === "en" ? "User ID" : "ID utilisateur"}: {book.user_ID}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-lg font-bold text-(--main-color)">
                                        <FaDollarSign />
                                        <span>{book.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
export default BooksDashboard;