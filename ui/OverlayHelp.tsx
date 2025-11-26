import { IconType } from "react-icons";
import { MdOutlineHomeMax } from "react-icons/md";
import { IoIosArrowForward, IoIosHelpCircleOutline } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";


interface OverlayMessage {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Navbar {
    id: number;
    title: string;
    link: string;
    icon: IconType;
}

const NavbarText: Navbar[] = [
    {
        id: 1,
        title: "الرئيسية",
        link: "/",
        icon: MdOutlineHomeMax
    },
    {
        id: 2,
        title: " الكتب ",
        link: "/books",
        icon: GiBookshelf
    },
    {
        id: 3,
        title: " عن الدار ",
        link: "/about",
        icon: IoIosHelpCircleOutline
    }
]


const OverlayHelp: React.FC<OverlayMessage> = ({ toggle, setToggle }) => {
    const pathName = usePathname();
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
                        className="fixed top-0 left-0 inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-1/2 left-1/2 z-50 lg:w-96 w-10/12 bg-gray-800 py-6 px-4 rounded-2xl shadow-2xl border border-gray-700"
                    >
                        <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-(--main-color) text-gray-400 hover:rotate-90 absolute top-4 right-4">
                            <MdClose size={24} />
                        </button>
                        <ul className="text-right flex justify-end flex-col gap-3 mt-8">
                            {NavbarText.map((nav) => (
                                <li key={nav.id} className="">
                                    <Link href={nav.link}
                                        className={`w-full relative px-4 py-3 text-lg font-bold transition-all duration-300 ease-in-out rounded-xl overflow-hidden group 
                                    flex items-center gap-3 justify-start
                            ${nav.link === pathName
                                                ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/20"
                                                : "text-gray-300 hover:text-white bg-gray-700/30 hover:bg-gray-700"}`}
                                        onClick={() => setToggle(!toggle)}
                                    >
                                        <nav.icon size={22} />
                                        <span>{nav.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link href="/sign-in" className="mt-6 w-full m-auto cursor-pointer group flex items-center justify-center gap-2 bg-(--main-color) text-white px-6 py-3 rounded-xl transition-all duration-200 hover:bg-[#a08b21] shadow-lg shadow-(--main-color)/20">
                            <span className="font-bold">انضم الآن</span>
                            <IoIosArrowForward size={18} className="transition duration-300 group-hover:-translate-x-1" />
                        </Link>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
export default OverlayHelp;