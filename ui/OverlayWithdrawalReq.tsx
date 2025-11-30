"use client"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { IoClose } from "react-icons/io5"

interface OverlayWithdrawalReqProps {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
    getAllOrders?: () => void;
}

const OverlayWithdrawalReq: React.FC<OverlayWithdrawalReqProps> = ({ toggle, setToggle, getAllOrders }) => {
    const t = useTranslations("WithdrawalRequest");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [accountDetails, setAccountDetails] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ paymentMethod, accountDetails, amount });
        // Add API call here
        alert(t("success"));
        setToggle(false);
    }

    if (!toggle) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={() => setToggle(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{t("title")}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("paymentMethod")}</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none"
                            required
                        >
                            <option value="">{t("selectPaymentMethod")}</option>
                            <option value="vodafoneCash">{t("vodafoneCash")}</option>
                            <option value="fawry">{t("fawry")}</option>
                            <option value="visa">{t("visa")}</option>
                            <option value="paypal">{t("paypal")}</option>
                        </select>
                    </div>

                    {paymentMethod && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {paymentMethod === "vodafoneCash" ? t("phoneNumber") : t("accountNumber")}
                            </label>
                            <input
                                type="text"
                                value={accountDetails}
                                onChange={(e) => setAccountDetails(e.target.value)}
                                placeholder={paymentMethod === "vodafoneCash" ? t("enterPhoneNumber") : t("enterAccountNumber")}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("amount")}</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={t("enterAmount")}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-(--main-color) focus:border-transparent outline-none"
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

export default OverlayWithdrawalReq;