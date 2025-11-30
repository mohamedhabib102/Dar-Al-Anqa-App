"use client"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { IoClose } from "react-icons/io5"

interface OverlayApproveOrderProps {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
    orderId?: number;
}

const OverlayApproveOrder: React.FC<OverlayApproveOrderProps> = ({ toggle, setToggle, orderId }) => {
    const t = useTranslations("Dashboard.orders");
    const [receiptImage, setReceiptImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ orderId, receiptImage });
        // Add API call here
        setToggle(false);
    }

    if (!toggle) return null;

    return (
        <div className="fixed h-full inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={() => setToggle(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{t("approve")}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("uploadReceipt")}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setReceiptImage(e.target.files ? e.target.files[0] : null)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-(--main-color) text-white py-2 rounded-md hover:opacity-90 transition font-bold"
                        >
                            {t("approve")}
                        </button>
                        <button
                            type="button"
                            onClick={() => setToggle(false)}
                            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition font-bold"
                        >
                            {t("cancel")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default OverlayApproveOrder;
