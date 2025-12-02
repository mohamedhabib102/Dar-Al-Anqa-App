"use client"
import { MdOutlineHomeMax } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/layout/LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/utils/contextapi";


interface OverlayMessage {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}


const OverlayHelp: React.FC<OverlayMessage> = ({ toggle, setToggle }) => {
    const pathName = usePathname();
    const t = useTranslations('Header');
    const locale = useLocale();
    const { userData, logout } = useAuth();

    return (
        <AnimatePresence>
            {toggle && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setToggle(false)}
                        className="fixed top-0 left-0 inset-0 z-30 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 lg:w-96 w-10/12 bg-gray-800 py-6 px-4 rounded-2xl shadow-2xl border border-gray-700"
                    >
                        <motion.button
                            onClick={() => setToggle(false)}
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="cursor-pointer text-gray-400 hover:text-(--main-color) absolute top-4 right-4"
                        >
                            <MdClose size={24} />
                        </motion.button>

                        <ul className="text-right flex justify-end flex-col gap-3 mt-8">
                            <li>
                                <Link
                                    href={locale === "ar" ? "/ar" : locale === "fr" ? "/fr" : "/en"}
                                    className={`w-full relative px-4 py-3 text-lg font-bold transition-all duration-300 ease-in-out rounded-xl overflow-hidden group 
                                    flex items-center gap-3 justify-start
                                    ${pathName === `/${locale}`
                                            ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/20"
                                            : "text-gray-300 hover:text-white bg-gray-700/30 hover:bg-gray-700"}`}
                                    onClick={() => setToggle(false)}
                                >
                                    <MdOutlineHomeMax size={22} />
                                    <span>{t('home')}</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={locale === "ar" ? "/ar/books" : locale === "fr" ? "/fr/books" : "/en/books"}
                                    className={`w-full relative px-4 py-3 text-lg font-bold transition-all duration-300 ease-in-out rounded-xl overflow-hidden group 
                                    flex items-center gap-3 justify-start
                                    ${pathName === `/${locale}/books`
                                            ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/20"
                                            : "text-gray-300 hover:text-white bg-gray-700/30 hover:bg-gray-700"}`}
                                    onClick={() => setToggle(false)}
                                >
                                    <GiBookshelf size={22} />
                                    <span>{t('books')}</span>
                                </Link>
                            </li>
                            {(userData?.role === "Author" || userData?.role === "Publisher") && (
                              <li>
                                  <Link
                                      href={
                                          userData.role === "Author"
                                              ? `${locale === "ar" ? "/ar/author" : locale === "fr" ? "/fr/author" : "/en/author"}`
                                              : `${locale === "ar" ? "/ar/publisher" : locale === "fr" ? "/fr/publisher" : "/en/publisher"}`
                                      }
                                      className={`w-full relative px-4 py-3 text-lg font-bold transition-all duration-300 ease-in-out rounded-xl overflow-hidden group 
                                      flex items-center gap-3 justify-start
                                      ${
                                          pathName === `/${locale}/${userData.role === "Author" ? "author" : "publisher"}`
                                              ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/20"
                                              : "text-gray-300 hover:text-white bg-gray-700/30 hover:bg-gray-700"
                                      }`}
                                      onClick={() => setToggle(false)}
                                  >
                                      <GiBookshelf size={22} />
                                      <span>
                                          {userData.role === "Author"
                                              ? t("author")   
                                              : t("publisher")}
                                      </span>
                                  </Link>
                              </li>
                            )}

                            {userData?.userId && (
                                <li>
                                    <Link
                                        href={locale === "ar" ? "/ar/my-books" : locale === "fr" ? "/fr/my-books" : "/en/my-books"}
                                        className={`w-full relative px-4 py-3 text-lg font-bold transition-all duration-300 ease-in-out rounded-xl overflow-hidden group 
                                        flex items-center gap-3 justify-start
                                        ${pathName === `/${locale}/my-books`
                                                ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/20"
                                                : "text-gray-300 hover:text-white bg-gray-700/30 hover:bg-gray-700"}`}
                                        onClick={() => setToggle(false)}
                                    >
                                        <GiBookshelf size={22} />
                                        <span>{t('myBooks')}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                        {userData?.userId ? (
                            <button onClick={() => logout("/" + locale)}
                            className="mt-3 w-full m-auto cursor-pointer group flex items-center justify-center gap-2 bg-(--main-color) text-white px-6 py-2.5 rounded-md transition duration-200 hover:bg-(--main-color-rgb)">
                                <span className="font-medium">{t('logout')}</span>
                                <IoIosArrowForward size={18} className="transition duration-300  group-hover:translate-x-0.5" />
                            </button>
                        ) : (
                            <Link href={`/${locale}/sign-in`} className="mt-3 w-full m-auto cursor-pointer group flex items-center justify-center gap-2 bg-(--main-color) text-white px-6 py-3 rounded-xl transition-all duration-200 hover:bg-(--main-color-rgb) shadow-lg shadow-(--main-color)/20">
                                <span className="font-bold">{t("signIn")}</span>
                                <IoIosArrowForward size={18} className="transition duration-300 group-hover:-translate-x-1" />
                            </Link>
                        )}
                        {userData?.role === "Admin" && (
                            <Link href={`/${locale}/dashboard`} className="mt-3 w-full m-auto cursor-pointer group flex items-center justify-center gap-2 bg-(--main-color) text-white px-6 py-3 rounded-xl transition-all duration-200 hover:bg-(--main-color-rgb) shadow-lg shadow-(--main-color)/20">
                                <span className="font-bold">{t("dashboard")}</span>
                                <IoIosArrowForward size={18} className="transition duration-300 group-hover:-translate-x-1" />
                            </Link>
                        )}
                        <LanguageSwitcher 
                            screen="mobile"
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
export default OverlayHelp;