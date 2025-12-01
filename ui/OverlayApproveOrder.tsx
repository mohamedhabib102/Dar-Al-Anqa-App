"use client"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5"
import api from "@/utils/api"

interface OverlayApproveOrderProps {
    toggle: boolean;
    setToggle: (toggle: boolean) => void;
    withdrawId?: number;
    authorId?: number;
    onSuccess?: () => void;
}

interface AuthorDetails {
    authorID: number;
    authorName: string;
    authorPlatFormEarning: number;
}

const OverlayApproveOrder: React.FC<OverlayApproveOrderProps> = ({
    toggle,
    setToggle,
    withdrawId,
    authorId,
    onSuccess
}) => {
    const t = useTranslations("Dashboard");
    const [authorDetails, setAuthorDetails] = useState<AuthorDetails | null>(null);
    const [loading, setLoading] = useState(false);

    // جلب تفاصيل الـ Author عند فتح الـ Overlay
    useEffect(() => {
        if (toggle && authorId) {
            fetchAuthorDetails();
        }
    }, [toggle, authorId]);

    const fetchAuthorDetails = async () => {
        if (!authorId) return;

        try {
            setLoading(true);
            const res = await api.get(`/api/Payment/DetailsAuthor/${authorId}`);
            console.log("Author Details:", res.data);
            setAuthorDetails(res.data);
        } catch (error) {
            console.log("Error fetching author details:", error);
        } finally {
            setLoading(false);
        }
    }

    // الموافقة على الطلب
    const handleApprove = async () => {
        if (!withdrawId) return;

        try {
            setLoading(true);
            const res = await api.post(`/api/Payment/ApprovedRequest/${withdrawId}`);
            console.log("Approved:", res.data);
            alert("تم الموافقة على الطلب بنجاح ✓");
            setToggle(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.log("Error approving:", error);
            alert("حدث خطأ أثناء الموافقة على الطلب");
        } finally {
            setLoading(false);
        }
    }

    // رفض الطلب
    const handleReject = async () => {
        if (!withdrawId) return;

        try {
            setLoading(true);
            const res = await api.post(`/api/Payment/RefusedRequest/${withdrawId}`);
            console.log("Rejected:", res.data);
            alert("تم رفض الطلب بنجاح ✗");
            setToggle(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.log("Error rejecting:", error);
            alert("حدث خطأ أثناء رفض الطلب");
        } finally {
            setLoading(false);
        }
    }

    if (!toggle) return null;

    return (
        <div className="fixed h-full inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={() => setToggle(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    تفاصيل طلب السحب
                </h2>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">جاري التحميل...</p>
                    </div>
                ) : authorDetails ? (
                    <div className="space-y-4">
                        {/* Author Details */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">اسم المؤلف/الناشر:</span>
                                <span className="text-base font-bold text-gray-800">{authorDetails.authorName}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">ID:</span>
                                <span className="text-base font-semibold text-gray-700">{authorDetails.authorID}</span>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="text-sm font-medium text-gray-600">إجمالي الأرباح:</span>
                                <span className="text-lg font-bold text-green-600">
                                    {authorDetails.authorPlatFormEarning} EGP
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleApprove}
                                disabled={loading}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ✓ موافقة
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={loading}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ✗ رفض
                            </button>
                        </div>

                        <button
                            onClick={() => setToggle(false)}
                            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-medium mt-2"
                        >
                            إلغاء
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">لا توجد بيانات</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OverlayApproveOrder;
