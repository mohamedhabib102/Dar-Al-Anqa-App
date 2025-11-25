import { IconType } from "react-icons";
import { MdOutlineHomeMax } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { IoIosArrowForward, IoIosHelpCircleOutline } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";


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
    return (
        <>
            <div className={`${toggle ? "opacity-100 visible" : "opacity-0 invisible"} fixed top-0 left-0 inset-0 z-10 bg-black/50`}></div>
            <div className={`${toggle ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0"}
        transition-all duration-300 fixed top-1/2 left-1/2 -translate-1/2 z-20 lg:w-96 w-10/12 m-auto bg-gray-100 dark:bg-gray-800 py-6 px-4 rounded-lg`}>
                <button onClick={() => setToggle(false)} className="cursor-pointer transition duration-200 hover:text-(--main-color) dark:text-gray-200 absolute top-2 right-2">
                    <MdClose size={30} />
                </button>
                <ul className="text-right flex justify-end flex-col gap-3 mt-7">
                    {NavbarText.map((nav) => (
                        <li key={nav.id} className="">
                            <Link href={nav.link}
                                className={`w-full relative px-4 py-2 text-lg font-bold transition-all duration-300 ease-in-out rounded-lg overflow-hidden group 
                                    flex items-center gap-2 justify-start
                            ${nav.link === "/"
                                            ? "text-white bg-(--main-color) shadow-lg shadow-(--main-color)/40"
                                            : "text-gray-200 hover:text-white bg-gray-700/50 hover:bg-gray-700"}`}
                                onClick={() => setToggle(!toggle)}
                            >
                                <nav.icon size={20} />
                                <span>{nav.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className="mt-5 m-auto cursor-pointer group flex items-center gap-2 bg-(--main-color) text-white px-6 py-2.5 rounded-md transition-colors duration-200 hover:bg-[#a08b21]">
                    <span className="font-medium">انضم الآن</span>
                    <IoIosArrowForward size={18} className="transition duration-300  group-hover:translate-x-0.5" />
                </button>
            </div>
        </>
    )
}
export default OverlayHelp;