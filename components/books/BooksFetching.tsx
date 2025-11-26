import Image from "next/image";
import { FaCartPlus, FaEye, FaStar } from "react-icons/fa";


interface BooksFetching {
    id: number;
    title: string;
    author: string;
    price: number;
    image: string;
}


const books = [
    {
        id: 1,
        title: "اللص والكلاب",
        author: "نجيب محفوظ",
        price: 200,
        image: "/images/book.png"
    },
    {
        id: 2,
        title: "ثلاثية غرناطة",
        author: "رضوى عاشور",
        price: 130,
        image: "/images/book.png"
    },
    {
        id: 3,
        title: "رجال في الشمس",
        author: "غسان كنفاني",
        price: 80,
        image: "/images/book.png"
    },
    {
        id: 4,
        title: "الخيميائي",
        author: "باولو كويلو",
        price: 150,
        image: "/images/book.png"
    }
];


type Props = {
    count: number;
}
const BooksFetching: React.FC<Props> = ({count}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {books.slice(0, count).map((book) => (
                <div key={book.id} className="book-card group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
                    <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
                        <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-(--main-color) shadow-sm">
                            {book.author}
                        </div>

                        {/* Overlay Actions */}
                        <div className="absolute top-3 right-3 flex items-center flex-col gap-3">
                            <button className="cursor-pointer bg-white text-gray-800 p-3 rounded-full transition hover:bg-(--main-color) hover:text-white shadow-lg" title="أضف للسلة">
                                <FaCartPlus size={18} 
                                />
                            </button>
                            <button className="cursor-pointer bg-white text-gray-800 p-3 rounded-full transition hover:bg-(--main-color) hover:text-white shadow-lg" title="التفاصيل">
                                <FaEye size={18} 
                                />
                            </button>
                        </div>
                    </div>

                    <div className="p-4 text-right">
                        <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{book.title}</h3>
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-xl font-bold text-(--main-color)">{book.price} ج.م</span>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium text-gray-500">4.5</span>
                                <FaStar
                                    size={20} 
                                    className="text-yellow-500 transition text-xs"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default BooksFetching;