"use client"

import api from "@/utils/api"
import { useAuth } from "@/utils/contextapi"
import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import { MdCloudUpload } from "react-icons/md"
import { FaImage } from "react-icons/fa"
import { useTranslations } from "next-intl"
import { fetchCategories } from "@/utils/GetAllCategory"

interface Category {
    category_Id: number;
    category_Name: string;
}

interface AddNewBookProps {
    user_ID: number,
    book_Name: string,
    book_Description: string,
    file_Path: File | null,
    image: File | null,
    price: number,
    category: Category

}

interface PropsAddNewBook {
    toggle: boolean,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    pathLink: string;
    getBooks: () => void
}

const AddNewBook: React.FC<PropsAddNewBook> = ({ toggle, setToggle, pathLink, getBooks }) => {
    const { userData } = useAuth();
    const t = useTranslations("AddBookForm");
    const [data, setData] = useState<AddNewBookProps>({
        user_ID: Number(userData?.userId),
        book_Name: "",
        book_Description: "",
        file_Path: null,
        image: null,
        price: 0,
        category: {
            category_Id: 0,
            category_Name: ""
        }
    })

    const [fileName, setFileName] = useState<string>("");
    const [imageName, setImageName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<Category[]>([]);
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [selected, setSelected] = useState<string[]>([]);

    const addOption = (option: string) => {
        if (!selected.includes(option)) {
            setSelected([...selected, option]);
        }
    }

    const removeOption = (option: string) => {
        setSelected(selected.filter((item) => item !== option));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "price") {
            // Allow only numbers and decimals, and prevent negative values
            if (value === "" || (/^\d*\.?\d*$/.test(value) && Number(value) >= 0)) {
                setData(prev => ({
                    ...prev,
                    [name]: Number(value)
                }));
            }
        } else {
            setData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type === "application/pdf") {
            // Check file size (50 MB = 50 * 1024 * 1024 bytes)
            const maxSize = 50 * 1024 * 1024;
            if (file.size > maxSize) {
                alert(t("pdfSizeError"))
                e.target.value = ""
                return
            }
            setData(prev => ({
                ...prev,
                file_Path: file
            }))
            setFileName(file.name)
        } else {
            alert(t("pdfError"))
            e.target.value = ""
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith("image/")) {
            // Check file size (5 MB = 5 * 1024 * 1024 bytes)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert(t("imageSizeError"))
                e.target.value = ""
                return
            }
            setData(prev => ({
                ...prev,
                image: file
            }))
            setImageName(file.name)
        } else {
            alert(t("imageError"))
            e.target.value = ""
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData();

            formData.append("User_ID", data.user_ID.toString());
            formData.append("Book_Name", data.book_Name);
            formData.append("Book_Description", data.book_Description);
            formData.append("Price", data.price.toString());
            // Map selected category names to IDs
            const selectedIds = selected.map(name =>
                category.find(c => c.category_Name === name)?.category_Id
            ).filter((id): id is number => id !== undefined);

            selectedIds.forEach(id => {
                formData.append("Categories", id.toString());
            });

            if (data.image) {
                formData.append("image", data.image);
            }

            if (data.file_Path) {
                formData.append("pdf", data.file_Path);
            }

            const res = await api.post(pathLink, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(t("success"));
            handleClose()
            getBooks()
            setLoading(false)
        } catch (error: any) {
            console.log(error);
            // Check if error is 400 Bad Request
            if (error.response && error.response.status === 400) {
                alert(t("badRequestError"))
            } else {
                alert(t("error"))
            }
        }
    }

    const handleClose = () => {
        setToggle(false)
        setData({
            user_ID: Number(userData?.userId),
            book_Name: "",
            book_Description: "",
            file_Path: null,
            image: null,
            price: 0,
            category: {
                category_Id: 0,
                category_Name: ""
            }
        })
        setFileName("");
        setImageName("");
    }

    useEffect(() => {
        fetchCategories().then((res) => {
            setCategory(res)
        })
    }, []);

    useEffect(() => {
        if (userData?.userId) {
            setData(prev => ({ ...prev, user_ID: Number(userData.userId) }));
        }
    }, [userData]);

    return (
        <>
            <div
                onClick={handleClose}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${toggle ? "opacity-100 visible" : "opacity-0 invisible"}`}
            ></div>

            <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${toggle ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-linear-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-2xl flex justify-between items-center">
                        <h2 className="text-2xl font-bold">{t("title")}</h2>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <IoClose size={28} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label htmlFor="book_Name" className="block text-gray-700 dark:text-white font-semibold mb-2 text-right">
                                {t("bookName")} <span className="text-red-500">{t("required")}</span>
                            </label>
                            <input
                                id="book_Name"
                                type="text"
                                name="book_Name"
                                value={data.book_Name}
                                onChange={handleChange}
                                required
                                placeholder={t("bookNamePlaceholder")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition text-right"
                            />
                        </div>

                        <div>
                            <label htmlFor="book_Description" className="block text-gray-700 dark:text-white font-semibold mb-2 text-right">
                                {t("bookDescription")} <span className="text-red-500">{t("required")}</span>
                            </label>
                            <textarea
                                id="book_Description"
                                name="book_Description"
                                value={data.book_Description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition resize-none text-right"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="book_Description" className="block text-gray-700 dark:text-white font-semibold mb-2 text-right">
                                {t("category")} <span className="text-red-500">{t("required")}</span>
                            </label>
                            {/* Selected tags */}
                            <div className="flex flex-wrap gap-2 mb-2 justify-end">
                                {selected.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-(--main-color) text-white px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeOption(item)}
                                            className="text-sm hover:text-red-300"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* Input Field */}
                            <input
                                type="text"
                                placeholder={t("selectCategory")}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setTimeout(() => setInputFocused(false), 150)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition text-right"
                            />

                            {/* Dropdown options */}
                            {inputFocused && (
                                <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-y-auto z-20">
                                    {category.map((cat) => (
                                        <div
                                            key={cat.category_Id}
                                            onClick={() => {
                                                addOption(cat.category_Name);

                                                // تحديث الداتا (آخر اختيار فقط للـ FormData)
                                                setData((prev) => ({
                                                    ...prev,
                                                    category: {
                                                        category_Id: cat.category_Id,
                                                        category_Name: cat.category_Name
                                                    }
                                                }));
                                            }}
                                            className="px-4 py-3 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition text-right"
                                        >
                                            {cat.category_Name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-gray-700 dark:text-white font-semibold mb-2 text-right">
                                {t("price")} <span className="text-red-500">{t("required")}</span>
                            </label>
                            <input
                                id="price"
                                type="number"
                                name="price"
                                value={data.price || ""}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder={t("pricePlaceholder")}
                                className="w-full px-4 py-3 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition text-right"
                            />
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-(--main-color) hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    <FaImage size={48} className="text-gray-400 mb-3" />
                                    <span className="text-gray-600 font-medium">
                                        {imageName || t("bookImagePlaceholder")}
                                    </span>
                                    <span className="text-gray-400 text-sm mt-1">
                                        {t("bookImageHint")}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    type="file"
                                    name="pdf-upload"
                                    accept=".pdf,application/pdf"
                                    onChange={handleFileChange}
                                    required
                                    className="hidden"
                                    id="pdf-upload"
                                />
                                <label
                                    htmlFor="pdf-upload"
                                    className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-(--main-color) hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    <MdCloudUpload size={48} className="text-gray-400 mb-3" />
                                    <span className="text-gray-600 font-medium">
                                        {fileName || t("bookFilePlaceholder")}
                                    </span>
                                    <span className="text-gray-400 text-sm mt-1">
                                        {t("bookFileHint")}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="cursor-pointer flex-1 bg-(--main-color) text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                            >
                                {loading ? "........." : t("submit")}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="cursor-pointer flex-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white py-3 rounded-lg font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                            >
                                {t("cancel")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddNewBook