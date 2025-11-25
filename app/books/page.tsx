import BooksFetching from "@/components/books/BooksFetching";
import Header from "@/layout/Header";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"




const Books: React.FC = ()=> {
    return (
        <>
        <Header/>
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
export default Books;