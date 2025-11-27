import MyBooksUser from "@/components/books/myBooks";
import Header from "@/layout/Header";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { useTranslations } from "next-intl";





const MyBooks:React.FC = () => {
    const t = useTranslations("MyBooks");
    return (
        <>
        <Header />
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                title={t("title")}
                description={t("description")}
                success={true}
                />
                <MyBooksUser />
            </CustomContainer>
        </section>
        </>
    )
}
export default MyBooks