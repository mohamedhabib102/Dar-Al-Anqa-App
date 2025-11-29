"use client"

import api from "@/utils/api"
import { useAuth } from "@/utils/contextapi"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { MdCloudUpload } from "react-icons/md"
import { FaImage } from "react-icons/fa"
import { useTranslations } from "next-intl"


interface AddNewBookProps {
    user_ID: number,
    book_Name: string,
    book_Description: string,
    file_Path: File | null,
    image: File | null,
    price: number
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
        price: 0
    })
    const [fileName, setFileName] = useState<string>("");
    const [imageName, setImageName] = useState<string>("");

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
        e.preventDefault()
        try {
            const formData = new FormData();

            formData.append("User_ID", data.user_ID.toString());
            formData.append("Book_Name", data.book_Name);
            formData.append("Book_Description", data.book_Description);
            formData.append("Price", data.price.toString());

            // Send "string" as requested for File_Path
            formData.append("File_Path", "string");

            // Append Image_Url as empty string (required by backend model)
            formData.append("Image_Url", "string");

            if (data.image) {
                formData.append("image", data.image);
            }

            const res = await api.post(pathLink, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Response:", res);
            alert(t("success"));
            handleClose()
            getBooks()

        } catch (error) {
            console.log(error);
            alert(t("error"))
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
            price: 0
        })
        setFileName("");
        setImageName("");
    }

    return (
        <>
            <div
                onClick={handleClose}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${toggle ? "opacity-100 visible" : "opacity-0 invisible"}`}
            ></div>

            <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${toggle ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                            <label htmlFor="book_Name" className="block text-gray-700 font-semibold mb-2 text-right">
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
                            <label htmlFor="book_Description" className="block text-gray-700 font-semibold mb-2 text-right">
                                {t("bookDescription")} <span className="text-red-500">{t("required")}</span>
                            </label>
                            <textarea
                                id="book_Description"
                                name="book_Description"
                                value={data.book_Description}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder={t("bookDescriptionPlaceholder")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition resize-none text-right"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2 text-right">
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition text-right"
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
                                    className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-(--main-color) hover:bg-gray-50 transition-all"
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
                                    className="flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-(--main-color) hover:bg-gray-50 transition-all"
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
                                {t("submit")}
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="cursor-pointer flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold text-lg hover:bg-gray-300 transition-all"
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