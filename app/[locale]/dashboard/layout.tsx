"use client"
import Header from "@/layout/Header"
import CustomContainer from "@/ui/CustomContainer"
import { useAuth } from "@/utils/contextapi"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { MdDashboard, MdLibraryBooks, MdBusiness, MdOutlinePending } from "react-icons/md"


interface DashboardProps {
    children: React.ReactNode
}





const DashboardLayout: React.FC<DashboardProps> = ({ children }) => {
    const pathName = usePathname()
    const locale = useLocale()
    const t = useTranslations("Header")
    const {userData} = useAuth()
    const router = useRouter()



//     useEffect(() => {
//         if (userData?.role !== "Admin" || !userData?.userId) {
//             router.push(`/${locale}/`)
//         }
//    }, [userData?.role])
    return (
        <div className="dark:bg-gray-900">
            <Header />
            <div className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
                <nav className={
                    `flex w-full ${locale === "ar" ? "justify-start" : "justify-start"} py-4 container mx-auto md:px-6 px-4`
                }>
                    <ul className="flex items-center justify-center gap-3 md:gap-6">
                        <li>
                            <Link
                                className={`flex items-center gap-2 px-4 py-2.5 text-base md:text-lg font-medium transition-all duration-300 rounded-lg
                            ${pathName === `/${locale}/dashboard`
                                        ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/50"
                                        : "text-gray-300 bg-gray-700/50 hover:bg-(--main-color) hover:text-white hover:shadow-md"}`}
                                href={`/${locale}/dashboard`}
                            >
                                <MdDashboard size={22} />
                                <span className="hidden md:inline">{t('dashboard')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`flex items-center gap-2 px-4 py-2.5 text-base md:text-lg font-medium transition-all duration-300 rounded-lg
                            ${pathName === `/${locale}/dashboard/books`
                                        ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/50"
                                        : "text-gray-300 bg-gray-700/50 hover:bg-(--main-color) hover:text-white hover:shadow-md"}`}
                                href={`/${locale}/dashboard/books`}
                            >
                                <MdLibraryBooks size={22} />
                                <span className="hidden md:inline">{t('books')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`flex items-center gap-2 px-4 py-2.5 text-base md:text-lg font-medium transition-all duration-300 rounded-lg
                            ${pathName === `/${locale}/dashboard/publisher`
                                        ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/50"
                                        : "text-gray-300 bg-gray-700/50 hover:bg-(--main-color) hover:text-white hover:shadow-md"}`}
                                href={`/${locale}/dashboard/publisher`}
                            >
                                <MdBusiness size={22} />
                                <span className="hidden md:inline">{t('publisher')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`flex items-center gap-2 px-4 py-2.5 text-base md:text-lg font-medium transition-all duration-300 rounded-lg
                            ${pathName === `/${locale}/dashboard/pending-books`
                                        ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/50"
                                        : "text-gray-300 bg-gray-700/50 hover:bg-(--main-color) hover:text-white hover:shadow-md"}`}
                                href={`/${locale}/dashboard/pending-books`}
                            >
                                <MdOutlinePending size={22} />
                                <span className="hidden md:inline">{t('pending-books')}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <section className=" dark:bg-gray-900 py-8 min-h-screen bg-gray-50">
                <CustomContainer>
                    {children}
                </CustomContainer>
            </section>
        </div>
    )
}
export default DashboardLayout