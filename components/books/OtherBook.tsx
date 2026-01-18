import BooksFetching from "@/components/books/BooksFetching";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";





const OtherBook: React.FC = () => {
    const t = useTranslations("HomePage")
    const local = useLocale()
    return (
        <>
            <section className="py-16" id="BooksShow">
                <CustomContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                            {t("books.title")}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            {t("books.description")}
                        </p>
                        <div className="w-24 h-1.5 bg-(--main-color) mx-auto mt-6 rounded-full"></div>
                    </div>
                    <BooksFetching count="" />
                    <div className="mt-16 flex justify-center">
                        <Link
                            href={`/${local}/books`}
                            className="group relative inline-flex items-center gap-3 bg-(--main-color) text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
                        >
                            <span>
                                {local === "ar" ? "تصفح جميع الكتب" : local === "fr" ? "Parcourir tous les livres" : "Browse All Books"}
                            </span>
                            <svg
                                className={`w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 ${local === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </CustomContainer>
            </section>
        </>
    )
}
export default OtherBook;