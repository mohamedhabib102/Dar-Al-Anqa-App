"use client"

import api from "@/utils/api"
import { useAuth } from "@/utils/contextapi"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { MdCloudUpload } from "react-icons/md"


interface AddNewBookProps {
    user_ID: number,
    book_Name: string,
    book_Description: string,
    file_Path: File | null,
    price: number
}


interface PropsAddNewBook {
    toggle: boolean,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    pathLink: string
}


const AddNewBook: React.FC<PropsAddNewBook> = ({ toggle, setToggle, pathLink }) => {
    const { userData } = useAuth()
    const [data, setData] = useState<AddNewBookProps>({
        user_ID: Number(userData?.userId),
        book_Name: "",
        book_Description: "",
        file_Path: null,
        price: 0
    })
    const [fileName, setFileName] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }))
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
            alert("يرجى اختيار ملف PDF فقط")
            e.target.value = ""
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            let fileBase64 = "";

            // Convert PDF to base64 string
            if (data.file_Path) {
                fileBase64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(data.file_Path as File);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = error => reject(error);
                });
            }

            // Send book data with file as base64 string
            const bookData = {
                user_ID: data.user_ID,
                book_Name: data.book_Name,
                book_Description: data.book_Description,
                file_Path: "tghrftghfghfg",
                price: data.price
            }

            const res = await api.post(pathLink, bookData)
            console.log(res.data);
            console.log(bookData);

            // Close modal and reset form after success
            handleClose()

        } catch (error) {
            console.log(error);
            alert("حدث خطأ أثناء إضافة الكتاب")
        }

    }

    const handleClose = () => {
        setToggle(false)
        setData({
            user_ID: Number(userData?.userId),
            book_Name: "",
            book_Description: "",
            file_Path: null,
            price: 0
        })
        setFileName("")
    }

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={handleClose}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${toggle ? "opacity-100 visible" : "opacity-0 invisible"}`}
            ></div>

            {/* Modal */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${toggle ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-linear-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-2xl flex justify-between items-center">
                        <h2 className="text-2xl font-bold">إضافة كتاب جديد</h2>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <IoClose size={28} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Book Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-right">
                                اسم الكتاب <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="book_Name"
                                value={data.book_Name}
                                onChange={handleChange}
                                required
                                placeholder="أدخل اسم الكتاب"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition text-right"
                            />
                        </div>

                        {/* Book Description */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-right">
                                وصف الكتاب <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="book_Description"
                                value={data.book_Description}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="أدخل وصف مختصر للكتاب"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition resize-none text-right"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-right">
                                السعر (ج.م) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={data.price || ""}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder="أدخل سعر الكتاب"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none transition text-right"
                            />
                        </div>

                        {/* PDF File Upload */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-right">
                                ملف الكتاب (PDF) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
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
                                        {fileName || "اضغط لاختيار ملف PDF"}
                                    </span>
                                    <span className="text-gray-400 text-sm mt-1">
                                        PDF فقط - الحد الأقصى 50 ميجابايت
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="cursor-pointer flex-1 bg-(--main-color) text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                            >
                                إضافة الكتاب
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="cursor-pointer flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold text-lg hover:bg-gray-300 transition-all"
                            >
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddNewBook