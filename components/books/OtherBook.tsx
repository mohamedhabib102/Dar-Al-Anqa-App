import BooksFetching from "@/components/books/BooksFetching";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import {  useTranslations } from "next-intl";





const OtherBook: React.FC = () => {
    const t = useTranslations("HomePage")
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
            </CustomContainer>
        </section>
        </>
    )
}
export default OtherBook;