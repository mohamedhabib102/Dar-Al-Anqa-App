"use client"
import { useLocale } from "next-intl";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "@/utils/api";


interface Review {
    user_Name: string;
    comment: string;
    ratingNumber: number;
}

interface CommentsRatingsProps {
    book_id: number;
}

const CommentsRatings: React.FC<CommentsRatingsProps> = ({ book_id }) => {
    const local = useLocale();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getAllReviews = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/api/Reviews/GetAllReview${book_id}`);
            console.log(res.data);
            setReviews(res.data || []);
        } catch (error) {
            console.log(error);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (book_id) {
            getAllReviews();
        }
    }, [book_id]);

    if (loading) {
        return (
            <div className="mt-8 text-center">
                <p className="text-gray-500">جاري تحميل التقييمات...</p>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="mt-8 text-center">
                <p className="text-gray-500">لا توجد تقييمات متاحة</p>
            </div>
        );
    }

    return (
        <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {reviews.map((review, index) => (
                <div 
                    key={index}
                    className="bg-[#EEE] p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-13 h-13 rounded-full bg-(--main-color) flex items-center text-white text-2xl justify-center">
                            <span>{review.user_Name?.charAt(0) || "—"}</span>
                        </div>
                        <div className="flex items-center flex-col">
                            <h4 className="text-sm font-medium">{review.user_Name || "غير محدد"}</h4>
                            <span className={`
                                 ${local === "ar" ? "ml-auto" : "mr-auto"}
                                text-gray-600 text-sm mt-1
                                `}>
                                {review.ratingNumber || 0}
                                 <FaStar
                                    size={18}
                                    className="ml-1 text-yellow-500 inline-block transition text-xs"
                                />
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-3 text-lg leading-7">{review.comment || "—"}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentsRatings;