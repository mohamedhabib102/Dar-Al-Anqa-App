import BooksFetching from "@/components/books/BooksFetching";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import {  useLocale, useTranslations } from "next-intl";
import Link from "next/link";





const OtherBook: React.FC = () => {
    const t = useTranslations("HomePage")
    const local =  useLocale()
    return (
        <>
        <section className="py-16" id="BooksShow">
            <CustomContainer>
                <CustomTitle
                title={t("books.title")}
                description={t("books.description")}
                success={true}
                />
                <BooksFetching count=""/>
                <div className="mb-8 flex justify-end mt-12">
                <Link href={`${local}/books`}
                    className="flex items-center gap-2 transition duration-300 cursor-pointer bg-(--main-color) text-white px-6 py-3 rounded-lg hover:bg-[#8b7a26] font-bold shadow-lg hover:shadow-xl"
                    >
                    {local === "ar" ? " تصفح جميع الكتب " : local === "fr" ? "Parcourir tous les livres" :"Browse All Books"}
                 </Link>
                        </div>
            </CustomContainer>
        </section>
        </>
    )
}
export default OtherBook;