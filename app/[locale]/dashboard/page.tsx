"use client"
import { useLocale, useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import OverlayApproveOrder from "@/ui/OverlayApproveOrder"
import api from "@/utils/api";
import { FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "@/utils/contextapi";
import { useRouter } from "next/navigation";

interface Withdraw {
    amount: number;
    approvalDate: string;
    authorID: number;
    paymentMethod: string;
    requestDate: string;
    status: string;
    withdraw_Id: number;
}

const Dashboard: React.FC = () => {
    const t = useTranslations("Dashboard");
    const [withdrawals, setWithdrawals] = useState<Withdraw[]>([]);
    const {userData} = useAuth();
    const locale = useLocale();
    const router = useRouter();
    const [platformEarnings, setPlatformEarnings] = useState<number>(0);
    const [toggleApprove, setToggleApprove] = useState(false);
    const [selectedWithdrawId, setSelectedWithdrawId] = useState<number | undefined>(undefined);
    const [selectedAuthorId, setSelectedAuthorId] = useState<number | undefined>(undefined);

    const getWithdraws = async () => {
        try {
            const res = await api.get("/api/Payment/AllWithdraws");
            console.log("All Withdrawals:", res.data);
            setWithdrawals(res.data);
        } catch (error) {
            console.log("Error fetching withdrawals:", error);
        }
    }

    const getPlatformEarnings = async () => {
        try {
            const res = await api.get("/api/Payment/PlatformEarnings");
            console.log("Platform Earnings:", res.data);
            setPlatformEarnings(res.data);
        } catch (error) {
            console.log("Error fetching platform earnings:", error);
        }
    }

    useEffect(() => {
        getWithdraws();
        getPlatformEarnings();
    }, []);

    const handleViewDetails = (withdrawId: number, authorId: number) => {
        setSelectedWithdrawId(withdrawId);
        setSelectedAuthorId(authorId);
        setToggleApprove(true);
    };


    useEffect(() => {
        if (userData?.role !== "Admin") {
            router.push(`/${locale}/books`);
        }
    }, [])

    return (
        <div className="lg:p-6 md:p-4 p-0 space-y-8">
            <OverlayApproveOrder
                toggle={toggleApprove}
                setToggle={setToggleApprove}
                withdrawId={selectedWithdrawId}
                authorId={selectedAuthorId}
                onSuccess={getWithdraws}
            />

            {/* Platform Earnings Section */}
            <section className="bg-linear-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                            <FaMoneyBillWave className="text-white text-4xl" />
                        </div>
                        <div>
                            <h2 className="text-white text-lg font-medium mb-1">إجمالي أرباح المنصة</h2>
                            <p className="text-white/80 text-sm">Total Platform Earnings</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white text-5xl font-bold">
                            {platformEarnings.toLocaleString('ar-EG')}
                        </p>
                        <p className="text-white/90 text-xl font-medium mt-1">جنيه مصري</p>
                    </div>
                </div>
            </section>

            {/* Withdrawal Requests Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                    {t("withdrawalRequests.title")} ({withdrawals.length})
                </h2>

                {withdrawals.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">لا توجد طلبات سحب معلقة</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {withdrawals.map((withdrawal, index) => (
                            <div
                                key={withdrawal.withdraw_Id}
                                className="border rounded-lg p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">
                                            طلب #{index + 1}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            Author ID: {withdrawal.authorID}
                                        </p>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${withdrawal.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : withdrawal.status === "Rejected"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}>
                                        {withdrawal.status}
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="text-gray-600 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium">{t("withdrawalRequests.amount")}:</span>
                                        <span className="text-green-600 font-bold">{withdrawal.amount} EGP</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">طريقة الدفع:</span>
                                        <span className="text-blue-600">{withdrawal.paymentMethod}</span>
                                    </div>

                                    <div className="flex justify-between text-xs">
                                        <span className="font-medium">تاريخ الطلب:</span>
                                        <span className="text-gray-500">
                                            {new Date(withdrawal.requestDate).toLocaleDateString('ar-EG')}
                                        </span>
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <button
                                    onClick={() => handleViewDetails(withdrawal.withdraw_Id, withdrawal.authorID)}
                                    className="w-full bg-(--main-color) hover:opacity-90 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200 mt-2"
                                >
                                    عرض التفاصيل والموافقة/الرفض
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Dashboard;