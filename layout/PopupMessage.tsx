"use client"

import { usePopup } from "@/utils/popupContext";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const PopupMessage = () => {
    const { isOpen, message, onConfirm, closePopup } = usePopup();
    const t = useTranslations("Popup");

    const handleConfirm = () => {
        onConfirm();
        closePopup();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-sm w-full text-center border border-gray-100 dark:border-gray-700"
                    >
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {message}
                            </h3>
                        </div>
                        <button
                            onClick={handleConfirm}
                            className="w-full bg-(--main-color) hover:bg-[#a08b21] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                            {t("ok")}
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PopupMessage;
