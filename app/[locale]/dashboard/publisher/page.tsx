"use client"
import CustomTitle from "@/ui/CustomTitle";
import api from "@/utils/api";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react"
import { FaUser, FaPhone, FaUserTag, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

interface Publisher {
    user_Id: number;
    name: string;
    phoneNumber: string;
    role: string;
    isAccepted: boolean;
}


/*
   karime
   0102554544
   MHGghghgh12345678
*/

const PublisherDashboard: React.FC = () => {
    const [publishers, setPublishers] = useState<Publisher[]>([])
    const locale = useLocale()
    const t = useTranslations("PublisherDashboard"); 
    const [toggleWithdrawal, setToggleWithdrawal] = useState(false);
    const [totalProfit, setTotalProfit] = useState(0);

    const getPublishers = async () => {
        try {
            const res = await api.get("/api/Publishers")
            setPublishers(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleAccept = async (userId: number) => {
        try {
            await api.put(`/api/Publishers/${userId}/accept`)
            getPublishers()
        } catch (error) {
            console.log(error);
        }
    }

    const handleReject = async (userId: number) => {
        try {
            await api.put(`/api/Publishers/${userId}/reject`)
            getPublishers()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPublishers()
    }, [])

    return (
        <>
            <CustomTitle
                title={t("publisher_title")}
                description={t("publisher_description")}
                success={false}
            />


            <div className="space-y-4">
                {publishers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">{t("no_publishers")}</p>
                    </div>
                ) : (
                    publishers.map((publisher) => (
                        <div
                            key={publisher.user_Id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-(--main-color) flex items-center justify-center text-white font-bold text-lg">
                                        #{publisher.user_Id}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">{t("user_id")}</p>
                                        <p className="font-semibold text-gray-800">{publisher.user_Id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaUser className="text-(--main-color) text-2xl" />
                                    <div>
                                        <p className="text-xs text-gray-500">{t("name")}</p>
                                        <p className="font-semibold text-gray-800">{publisher.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-(--main-color) text-2xl" />
                                    <div>
                                        <p className="text-xs text-gray-500">{t("phone_number")}</p>
                                        <p className="font-semibold text-gray-800 direction-ltr">{publisher.phoneNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaUserTag className="text-(--main-color) text-2xl" />
                                    <div>
                                        <p className="text-xs text-gray-500">{t("role")}</p>
                                        <p className="font-semibold text-gray-800">{publisher.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        {publisher.isAccepted ? (
                                            <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                <FaCheckCircle />
                                                {t("accepted")}
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                                <FaTimesCircle />
                                                {t("pending")}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {!publisher.isAccepted && (
                                            <button
                                                onClick={() => handleAccept(publisher.user_Id)}
                                                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                {t("accept")}
                                            </button>
                                        )}

                                        {!publisher.isAccepted && (
                                            <button
                                                onClick={() => handleReject(publisher.user_Id)}
                                                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                {t("reject")}
                                            </button>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default PublisherDashboard
