"use client"
import CustomContainer from "@/ui/CustomContainer"
import Logo from "@/ui/Logo";
import OverlayHelp from "@/ui/OverlayHelp";
import ToggleNavbar from "@/ui/ToggleNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

const Header: React.FC = () => {
    const [toggle, setToggle] = useState(false);
    const pathName = usePathname();
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
                                    href="/"
                                    className={`px-4 py-2 text-lg font-medium transition rounded-md
                            ${pathName === "/"
                                            ? "text-white bg-(--main-color)"
                                            : "text-white bg-gray-800 hover:bg-(--main-color)"}`}
                                >
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/books"
                                    className={`px-4 py-2 text-lg font-medium transition rounded-md
                            ${pathName === "/books"
                                            ? "text-white bg-(--main-color)"
                                            : "text-white bg-gray-800 hover:bg-(--main-color)"}`}
                                >
                                    الكتب
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className={`px-5 py-2 text-lg font-medium transition rounded-md
                            ${pathName === "/about"
                                            ? "text-white bg-(--main-color)"
                                            : "text-gray-300 hover:text-white bg-gray-800 hover:bg-(--main-color)"}`}
                                >
                                    عن الدار
                                </Link>
                            </li>
                        </motion.ul>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex items-center gap-4 flex-row-reverse">
                            <ToggleNavbar setToggle={setToggle} toggle={toggle} />
                            <Link href="/sign-in" className="cursor-pointer group lg:flex  hidden items-center gap-2 bg-(--main-color) text-white px-6 py-2.5 rounded-md transition-colors duration-200 hover:bg-[#a08b21]">
                                <span className="font-medium">انضم الآن</span>
                                <IoIosArrowForward size={18} className="transition duration-300  group-hover:translate-x-0.5" />
                            </Link>
                        </motion.div>
                    </nav>
                </CustomContainer>
            </section>
        </>
    )
}
export default Header;