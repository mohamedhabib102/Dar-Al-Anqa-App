import BooksFetching from "@/components/books/BooksFetching";
import Header from "@/layout/Header";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import { useLocale, useTranslations } from "next-intl";




const Books: React.FC = ()=> {
    const t = useTranslations("HomePage")
    const locale = useLocale();
    return (
        <>
        <Header/>
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                title={t("books.title")}
                description={t("books.description")}
                success={true}
                />
                <BooksFetching count="success"/>
            </CustomContainer>
        </section>
        </>
    )
}
export default Books;