"use client"
import CustomContainer from "@/ui/CustomContainer"
import Logo from "@/ui/Logo";
import OverlayHelp from "@/ui/OverlayHelp";
import ToggleNavbar from "@/ui/ToggleNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import LanguageSwitcher from "@/layout/LanguageSwitcher";
import { useAuth } from "@/utils/contextapi";
import { FaShoppingCart } from "react-icons/fa";

const Header: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathName = usePathname();
    const locale = useLocale();
    const t = useTranslations('Header');
    const { userData, logout } = useAuth();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <OverlayHelp
                toggle={toggle}
                setToggle={setToggle} />
            <section className="bg-gray-900 py-3.5 h-[81px] border-b border-gray-800" dir="ltr">
                <CustomContainer>
                    <nav className="flex items-center justify-between">
                        <Logo />
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="lg:flex hidden flex-row-reverse gap-6">
                            <li>
                                <Link
                                    href={locale === "ar" ? "/ar" : locale === "fr" ? "/fr" : "/en"}
                                    className={`px-4 py-2 text-lg font-medium transition rounded-md
                            ${pathName === `/${locale}`
                                            ? "text-white bg-(--main-color)"
                                            : "text-white bg-gray-800 hover:bg-(--main-color)"}`}
                                >
                                    {t('home')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={locale === "ar" ? "/ar/books" : locale === "fr" ? "/fr/books" : "/en/books"}
                                    className={`px-4 py-2 text-lg font-medium transition rounded-md
                            ${pathName === `/${locale}/books`
                                            ? "text-white bg-(--main-color)"
                                            : "text-white bg-gray-800 hover:bg-(--main-color)"}`}
                                >
                                    {t('books')}
                                </Link>
                            </li>
                            {isMounted && userData?.userId && (
                                <li>
                                    <Link
                                        href={locale === "ar" ? "/ar/my-books" : locale === "fr" ? "/fr/my-books" : "/en/my-books"}
                                        className={`px-4 py-2 text-lg font-medium transition rounded-md
                                ${pathName === `/${locale}/my-books`
                                                ? "text-white bg-(--main-color)"
                                                : "text-white bg-gray-800 hover:bg-(--main-color)"}`}
                                    >
                                        {t('myBooks')}
                                    </Link>
                                </li>
                            )}
                            {isMounted && userData?.role === "Publisher" && (
                              <li>
                                     <Link
                                         href={locale === "ar" ? "/ar/publisher" : locale === "fr" ? "/fr/publisher" : "/en/publisher"}
                                         className={`px-4 py-2 text-lg font-medium transition rounded-md
                                 ${pathName === `/${locale}/publisher`
                                                 ? "text-white bg-(--main-color)"
                                                 : "text-white bg-gray-800 hover:bg-(--main-color)"}`}
                                     >
                                         {t('publisher')}
                                     </Link>
                              </li>
                            )}
                            {isMounted && userData?.role === "Author" && (
                              <li>
                                <Link
                                        href={locale === "ar" ? "/ar/author" : locale === "fr" ? "/fr/author" : "/en/author"}
                                        className={`px-4 py-2 text-lg font-medium transition rounded-md
                                 ${pathName === `/${locale}/author`
                                                 ? "text-white bg-(--main-color)"
                                                 : "text-white bg-gray-800 hover:bg-(--main-color)"}`}
                                     >
                                         {t('author')}
                                     </Link>
                              </li>
                            )}
                        </motion.ul>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex items-center gap-4 flex-row-reverse">
                            {isMounted && userData?.role === "Admin" && (
                                <Link href={`/${locale}/dashboard`} className="cursor-pointer group lg:flex  hidden items-center gap-2 bg-(--main-color) text-white px-6 py-2.5 rounded-md transition-colors duration-200 hover:bg-[#a08b21]">
                                    <span className="font-medium">{t('dashboard')}</span>
                                    <IoIosArrowForward size={18} className="transition duration-300  group-hover:translate-x-0.5" />
                                </Link>
                            )}
                            
                            <Link 
                                href={`/${locale}/cart`}
                                className="bg-(--main-color) text-white p-2 rounded-full shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
                                title={locale === "ar" ? "السلة" : locale === "en" ? "Cart" : "Panier"}
                            >
                                <FaShoppingCart size={18} />
                            </Link>
                            
                            <ToggleNavbar setToggle={setToggle} toggle={toggle} />
                            {isMounted && userData?.userId ? (
                                <button onClick={() => logout("/" + locale)}
                                    className="cursor-pointer group lg:flex  hidden items-center gap-2 bg-(--main-color) text-white px-6 py-2.5 rounded-md transition-colors duration-200 hover:bg-[#a08b21]">
                                    <span className="font-medium">{t('logout')}</span>
                                    <IoIosArrowForward size={18} className="transition duration-300  group-hover:translate-x-0.5" />
                                </button>
                            ) : (
                                isMounted && (
                                    <Link href={`/${locale}/sign-in`} className="cursor-pointer group lg:flex  hidden items-center gap-2 bg-(--main-color) text-white px-6 py-2.5 rounded-md transition-colors duration-200 hover:bg-[#a08b21]">
                                        <span className="font-medium">{t('signIn')}</span>
                                        <IoIosArrowForward size={18} className="transition duration-300  group-hover:translate-x-0.5" />
                                    </Link>
                                )
                            )}
                            <LanguageSwitcher
                                screen="desktop"
                            />
                        </motion.div>
                    </nav>
                </CustomContainer>
            </section>
        </>
    )
}
export default Header;