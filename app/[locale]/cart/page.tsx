"use client"
import CustomTitle from "@/ui/CustomTitle"
import CustomContainer from "@/ui/CustomContainer"
import { useAuth } from "@/utils/contextapi"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import api from "@/utils/api"
import Image from "next/image"
import { FaTrash } from "react-icons/fa"
import Header from "@/layout/Header"
import { useRouter } from "next/navigation"
import { usePopup } from "@/utils/popupContext"
import { useTranslations } from "next-intl"

interface CartItem {
    book_Id: number;
    price: number;
    author_Id: number;
}

interface Book {
    book_Id: number;
    book_Name: string;
    image_Url: string;
    price: number;
}

const Cart: React.FC = () => {
    const { userData } = useAuth()
    const locale = useLocale()
    const router = useRouter()
    const { showPopup } = usePopup()
    const t = useTranslations("Popup")
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [mounted, setMounted] = useState<boolean>(false)
    const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false)

    const getCartItems = async () => {
        if (!userData?.userId) return;

        try {
            setLoading(true);
            const res = await api.get(`/api/Cart/${userData.userId}/items`)
            setCartItems(res.data || [])
        } catch (error) {
            console.log(error);
            setCartItems([])
        } finally {
            setLoading(false);
        }
    }

    const getTotalPrice = async () => {
        if (!userData?.userId) return;

        try {
            const res = await api.get(`/api/Cart/${userData.userId}/total-price`)
            setTotalPrice(res.data || 0)
        } catch (error) {
            console.log(error);
            setTotalPrice(0)
        }
    }

    const getAllBooks = async () => {
        try {
            const res = await api.get("/api/Books/all")
            setBooks(res.data || [])
        } catch (error) {
            console.log(error);
            setBooks([])
        }
    }


    const deleteCartItem = async (book_Id: number) => {
        if (!userData?.userId) return;

        try {
            await api.delete("/api/Cart/items", {
                data: {
                    user_Id: userData.userId,
                    book_Id: book_Id
                }
            })
            // Refresh cart items and total
            getCartItems()
            getTotalPrice()
        } catch (error) {
            console.error("Error deleting cart item:", error);
            alert(locale === "ar" ? "حدث خطأ أثناء حذف العنصر" : locale === "en" ? "Error deleting item" : "Erreur lors de la suppression de l'élément")
        }
    }

    const handleCheckout = async () => {
        if (!userData?.userId) {
            alert("يجب تسجيل الدخول أولاً");
            return;
        }

        if (cartItems.length === 0) {
            alert("السلة فارغة");
            return;
        }

        try {
            setCheckoutLoading(true);

            const cart = cartItems[0]
            const paymentData = {
                user_Id: userData.userId,
                book_Id: cart.book_Id,
                author_Id: cart.author_Id,
                platFormFee: 0,
                authorEarnings: 0,
                price: totalPrice,
                payment_status: "Completed"
            };

             const  res= api.post("/api/Payment", paymentData);
            showPopup("تم إتمام الدفع بنجاح", () => {
                router.push(`/${locale}/books`);
            });
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("حدث خطأ أثناء إتمام الطلب");
        } finally {
            setCheckoutLoading(false);
        }
    };


    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && userData?.userId) {
            getAllBooks()
            getCartItems()
            getTotalPrice()
        } else if (mounted && !userData?.userId) {
            setLoading(false)
        }
    }, [mounted, userData?.userId])

    // Get book details for each cart item
    const getBookDetails = (book_Id: number) => {
        return books.find(b => b.book_Id === book_Id)
    }

    // Show loading state until mounted to prevent hydration mismatch
    if (!mounted || loading) {
        return (
            <>
                <Header />
                <section className="py-16">
                    <CustomContainer>
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {locale === "ar" ? "جاري التحميل..." : locale === "en" ? "Loading..." : "Chargement..."}
                            </p>
                        </div>
                    </CustomContainer>
                </section>
            </>
        )
    }

    if (!userData?.userId) {
        return (
            <>
                <Header />
                <section className="py-16">
                    <CustomContainer>
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {locale === "ar" ? "يجب تسجيل الدخول لعرض السلة" : locale === "en" ? "Please login to view cart" : "Veuillez vous connecter pour voir le panier"}
                            </p>
                        </div>
                    </CustomContainer>
                </section>
            </>
        )
    }

    return (
        <>
            <Header />
            <section className="py-16">
                <CustomContainer>
                    <CustomTitle
                        title={locale === "ar" ? "السلة" : locale === "en" ? "Cart" : "Panier"}
                        description={locale === "ar" ? "عرض العناصر في السلة" : locale === "en" ? "View items in cart" : "Voir les articles dans le panier"}
                        success={false}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg shadow">
                                    <p className="text-gray-500 dark:text-gray-200 text-lg">
                                        {locale === "ar" ? "السلة فارغة" : locale === "en" ? "Cart is empty" : "Le panier est vide"}
                                    </p>
                                </div>
                            ) : (
                                cartItems.map((item, index) => {
                                    const book = getBookDetails(item.book_Id)
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800"
                                        >
                                            <div className="flex flex-row gap-4 p-4">
                                                {/* Book Image - Optimized size */}
                                                <div className="relative h-[120px] w-[85px] md:h-[140px] md:w-[100px] overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0 shadow-sm">
                                                    <Image
                                                        src={book?.image_Url || "/images/book.png"}
                                                        alt={book?.book_Name || (locale === "ar" ? "كتاب" : locale === "en" ? "Book" : "Livre")}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Book Details */}
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-base md:text-lg text-gray-800 dark:text-gray-200 mb-1 line-clamp-2">
                                                            {book?.book_Name || (locale === "ar" ? "كتاب" : locale === "en" ? "Book" : "Livre")}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-200 mb-3">
                                                            {locale === "ar" ? "كتاب إلكتروني" : locale === "en" ? "E-Book" : "Livre électronique"}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xl md:text-2xl font-bold text-(--main-color)">
                                                            {item.price} {locale === "ar" ? "ج.م" : locale === "en" ? "USD" : "€"}
                                                        </span>
                                                        <button
                                                            onClick={() => deleteCartItem(item.book_Id)}
                                                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                                                            title={locale === "ar" ? "حذف" : locale === "en" ? "Delete" : "Supprimer"}
                                                        >
                                                            <FaTrash size={14} />
                                                            <span className="text-sm hidden md:inline">
                                                                {locale === "ar" ? "حذف" : locale === "en" ? "Delete" : "Supprimer"}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {/* Payment & Total Section */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* Payment Methods */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                                    {locale === "ar" ? "طرق الدفع المتاحة" : locale === "en" ? "Available Payment Methods" : "Méthodes de paiement disponibles"}
                                </h3>
                        
                            <div className="space-y-3">
                                {/* Visa */}
                                <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500 transition-all cursor-pointer">
                                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                                        💳
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                                            Visa
                                        </p>
                                    </div>
                                </div>
                        
                                {/* PayPal */}
                                <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500 transition-all cursor-pointer">
                                    <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
                                        🅿️
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                                            PayPal
                                        </p>
                                    </div>
                                </div>
                        
                                {/* Fawry */}
                                <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-500 transition-all cursor-pointer">
                                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xl">
                                        💵
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                                            Fawry
                                        </p>
                                    </div>
                                </div>
                        
                                {/* Vodafone Cash */}
                                <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-500 transition-all cursor-pointer">
                                    <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white text-xl">
                                        📱
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                                            Vodafone Cash
                                        </p>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xs text-blue-800 text-center">
                                    🔒 {locale === "ar" ? "جميع المعاملات آمنة ومشفرة" : locale === "en" ? "All transactions are secure and encrypted" : "Toutes les transactions sont sécurisées et cryptées"}
                                </p>
                            </div>
                        </div>
                        </div>

                    </div>
                </CustomContainer>
            </section>
        </>
    )
}

export default Cart
