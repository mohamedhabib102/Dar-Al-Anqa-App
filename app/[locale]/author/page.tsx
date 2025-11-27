"use client"
import AddNewBook from "@/components/dashboard/AddNewBook"
import Header from "@/layout/Header"
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import { useAuth } from "@/utils/contextapi"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"


/*
publisher

Humbara
201027445533
publisher7000

athor
201027445544
athor7000
*/




const Author: React.FC = () => {
    const locale = useLocale()
    const [toggle, setToggle] = useState<boolean>(false)
    const [isMounted, setIsMounted] = useState(false);
    const {userData} = useAuth()


    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <>
        <AddNewBook
         toggle={toggle}
         setToggle={setToggle}
         pathLink="/api/Books"
        />
        <Header />
        <section className="py-16">
            <CustomContainer>
               <CustomTitle
                title="Author"
                description="Author Page"
                success={true}
               />
               { isMounted && userData?.isAccepted && (
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={() => setToggle(!toggle)}
                        className="flex items-center gap-2 transition duration-300 cursor-pointer bg-(--main-color) text-white px-6 py-3 rounded-lg hover:bg-[#8b7a26] font-bold shadow-lg hover:shadow-xl"
                    >
                        <FaPlus />
                        {locale === "ar" ? "إضافة كتاب جديد" : locale === "en" ? "Add New Book" : "Ajouter un nouveau livre"}
                    </button>
                </div>
               )}
            </CustomContainer>
        </section>
        </>
    )
}
export default Author