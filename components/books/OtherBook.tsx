import BooksFetching from "@/components/books/BooksFetching";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"





const OtherBook: React.FC = () => {
    return (
        <>
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                title="الكتب"
                description="اكتشف مجموعة متنوعة من الكتب في مختلف المجالات، واختيار ما يناسب اهتماماتك بسهولة"
                success={true}
                />
                <BooksFetching count={6}/>
            </CustomContainer>
        </section>
        </>
    )
}
export default OtherBook;