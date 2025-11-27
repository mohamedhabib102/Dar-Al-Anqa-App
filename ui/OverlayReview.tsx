"use client"
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLocale } from "next-intl";
import { FaStar } from "react-icons/fa";
import api from "@/utils/api";
import { useAuth } from "@/utils/contextapi";

interface OverlayReviewProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    book_Id: number;
    onReviewAdded?: () => void;
}

const OverlayReview: React.FC<OverlayReviewProps> = ({ toggle, setToggle, book_Id, onReviewAdded }) => {
    const locale = useLocale();
    const { userData } = useAuth();
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userData?.userId) {
            alert(locale === "ar" ? "يجب تسجيل الدخول أولاً" : locale === "en" ? "Please login first" : "Veuillez vous connecter d'abord");
            return;
        }

        if (rating === 0) {
            alert(locale === "ar" ? "يرجى اختيار التقييم" : locale === "en" ? "Please select a rating" : "Veuillez sélectionner une note");
            return;
        }

        if (!comment.trim()) {
            alert(locale === "ar" ? "يرجى إدخال التعليق" : locale === "en" ? "Please enter a comment" : "Veuillez entrer un commentaire");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/api/Reviews/ReviewRequirement", {
                user_Id: userData.userId,
                book_Id: book_Id,
                ratingNumber: rating,
                comment: comment.trim()
            });
            
            console.log("Review added:", response.data);
            alert(locale === "ar" ? "تم إضافة التقييم بنجاح" : locale === "en" ? "Review added successfully" : "Avis ajouté avec succès");
            
            // Reset form
            setRating(0);
            setComment("");
            setToggle(false);
            
            // Refresh reviews if callback provided
            if (onReviewAdded) {
                onReviewAdded();
            }
        } catch (error) {
            console.error("Error adding review:", error);
            alert(locale === "ar" ? "حدث خطأ أثناء إضافة التقييم" : locale === "en" ? "Error adding review" : "Erreur lors de l'ajout de l'avis");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {toggle && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setToggle(false)}
                        className="fixed top-0 left-0 inset-0 z-30 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 lg:w-96 w-10/12 bg-gray-800 py-6 px-4 rounded-2xl shadow-2xl border border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button
                            onClick={() => setToggle(false)}
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="cursor-pointer text-gray-400 hover:text-(--main-color) absolute top-4 right-4"
                        >
                            <MdClose size={24} />
                        </motion.button>

                        <form onSubmit={handleSubmit} className="mt-8">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                                {locale === "ar" ? "إضافة تقييم" : locale === "en" ? "Add Review" : "Ajouter un avis"}
                            </h2>

                            {/* Rating */}
                            <div className="mb-6">
                                <label className="block text-white text-sm font-medium mb-3">
                                    {locale === "ar" ? "التقييم" : locale === "en" ? "Rating" : "Note"}
                                </label>
                                <div className="flex items-center gap-2 justify-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="cursor-pointer transition-transform hover:scale-110"
                                        >
                                            <FaStar
                                                size={32}
                                                className={star <= rating ? "text-yellow-500" : "text-gray-400"}
                                            />
                                        </button>
                                    ))}
                                </div>
                                {rating > 0 && (
                                    <p className="text-center text-gray-400 mt-2 text-sm">
                                        {rating} {locale === "ar" ? "نجمة" : locale === "en" ? "star" : "étoile"}{rating > 1 ? (locale === "ar" ? "ات" : locale === "en" ? "s" : "s") : ""}
                                    </p>
                                )}
                            </div>

                            {/* Comment */}
                            <div className="mb-6">
                                <label className="block text-white text-sm font-medium mb-3">
                                    {locale === "ar" ? "التعليق" : locale === "en" ? "Comment" : "Commentaire"}
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-(--main-color) focus:outline-none resize-none"
                                    rows={4}
                                    placeholder={locale === "ar" ? "اكتب تعليقك هنا..." : locale === "en" ? "Write your comment here..." : "Écrivez votre commentaire ici..."}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-(--main-color) text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading 
                                    ? (locale === "ar" ? "جاري الإرسال..." : locale === "en" ? "Submitting..." : "Envoi en cours...")
                                    : (locale === "ar" ? "إرسال التقييم" : locale === "en" ? "Submit Review" : "Envoyer l'avis")
                                }
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default OverlayReview;

