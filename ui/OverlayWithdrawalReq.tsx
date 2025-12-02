"use client"
import api from "@/utils/api";
import { useAuth } from "@/utils/contextapi";
import { AxiosError } from "axios";
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { IoClose } from "react-icons/io5"

interface OverlayWithdrawalReqProps {
    toggleWithdrawal: boolean;
    setToggleWithdrawal: (toggle: boolean) => void;
}

const OverlayWithdrawalReq: React.FC<OverlayWithdrawalReqProps> = ({ toggleWithdrawal, setToggleWithdrawal }) => {
    const t = useTranslations("WithdrawalRequest");
    const locale = useLocale()
    const [paymentMethod, setPaymentMethod] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const { userData } = useAuth();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user_Id = userData?.userId;

        if (!user_Id) {
            alert("يجب تسجيل الدخول أولاً");
            return;
        }

        try {
            const data = {
                user_Id: user_Id,
                amount: amount,
                paymentMethod: paymentMethod,
                accountNumber: accountNumber
            }
            const res = await api.post("/api/Payment/WithdrawRequest", data);
            alert(t("success"));

            // Reset form
            setPaymentMethod("");
            setAccountNumber("");
            setAmount(0);
            setToggleWithdrawal(false);
        } catch (error: AxiosError | any) {
            console.log("Error:", error.response?.data);
            if (error.response?.status === 400) {
                alert(locale === "ar" ? " تاكد من وجود من ان رصيد اكبر من 1000 " : locale === "en" ? "Make sure that the balance is greater than 1000" : "Assurez-vous que le solde est supérieur à 1000");
            }
        }
    }

    if (!toggleWithdrawal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={() => setToggleWithdrawal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 ">{t("title")}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Payment Method */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">{t("paymentMethod")}</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border text-gray-700 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none"
                            required
                        >
                            <option className="dark:text-gray-700" value="">{t("selectPaymentMethod")}</option>
                            <option className="dark:text-gray-700" value="Vodafone cash">{t("vodafoneCash")}</option>
                            <option className="dark:text-gray-700" value="Fawry">{t("fawry")}</option>
                            <option className="dark:text-gray-700" value="Visa">{t("visa")}</option>
                            <option className="dark:text-gray-700" value="Paypal">{t("paypal")}</option>
                        </select>
                    </div>

                    {/* Account Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t("accountNumber")}
                        </label>
                        <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder={t("enterAccountNumber")}
                            className="w-full border text-gray-700 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">{t("amount")}</label>
                        <input
                            type="number"
                            value={amount || ""}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder={t("enterAmount")}
                            className="w-full border text-gray-700 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none"
                            required
                            min="1"
                        />
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-(--main-color) text-white py-2 rounded-md hover:opacity-90 transition font-bold"
                        >
                            {t("submit")}
                        </button>
                        <button
                            type="button"
                            onClick={() => setToggleWithdrawal(false)}
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

export default OverlayWithdrawalReq;