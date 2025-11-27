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

interface CartItem {
    book_Id: number;
    price: number;
}

interface Book {
    book_Id: number;
    book_Name: string;
    image: string;
    price: number;
}

const Cart: React.FC = () => {
    const { userData } = useAuth()
    const locale = useLocale()
    const router = useRouter()
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
            console.log(res.data);
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
            console.log(res.data);
            setTotalPrice(res.data || 0)
        } catch (error) {
            console.log(error);
            setTotalPrice(0)
        }
    }

    const getAllBooks = async () => {
        try {
            const res = await api.get("/api/Books/all")
            console.log(res.data);
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
            alert(locale === "ar" ? "يجب تسجيل الدخول أولاً" : locale === "en" ? "Please login first" : "Veuillez vous connecter d'abord")
            return;
        }

        if (cartItems.length === 0) {
            alert(locale === "ar" ? "السلة فارغة" : locale === "en" ? "Cart is empty" : "Le panier est vide")
            return;
        }

        try {
            setCheckoutLoading(true);
            const response = await api.post("/api/Payment", {
                user_Id: userData.userId,
                payment_status: "success"
            });
            
            console.log("Payment successful:", response.data);
            alert(locale === "ar" ? "تم إتمام الطلب بنجاح" : locale === "en" ? "Order completed successfully" : "Commande terminée avec succès")
            
            // Redirect to home or books page
            router.push(`/${locale}/books`)
        } catch (error) {
            console.error("Error during checkout:", error);
            alert(locale === "ar" ? "حدث خطأ أثناء إتمام الطلب" : locale === "en" ? "Error during checkout" : "Erreur lors de la commande")
        } finally {
            setCheckoutLoading(false);
        }
    }

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
                                <div className="text-center py-12 bg-white rounded-lg shadow">
                                    <p className="text-gray-500 text-lg">
                                        {locale === "ar" ? "السلة فارغة" : locale === "en" ? "Cart is empty" : "Le panier est vide"}
                                    </p>
                                </div>
                            ) : (
                                cartItems.map((item, index) => {
                                    const book = getBookDetails(item.book_Id)
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                                        >
                                            <div className="flex flex-col md:flex-row gap-4 p-4">
                                                {/* Book Image */}
                                                <div className="relative h-[200px] md:h-[150px] w-full md:w-[150px] overflow-hidden bg-gray-100 rounded-lg shrink-0">
                                                    <Image
                                                        src={book?.image || "/images/book.png"}
                                                        alt={book?.book_Name || (locale === "ar" ? "كتاب" : locale === "en" ? "Book" : "Livre")}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Book Details */}
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-800 mb-2">
                                                            {book?.book_Name || (locale === "ar" ? "كتاب" : locale === "en" ? "Book" : "Livre")}
                                                        </h3>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xl font-bold text-(--main-color)">
                                                                {item.price} {locale === "ar" ? "ج.م" : locale === "en" ? "USD" : "€"}
                                                            </span>
                                                            <button
                                                                onClick={() => deleteCartItem(item.book_Id)}
                                                                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                                                                title={locale === "ar" ? "حذف" : locale === "en" ? "Delete" : "Supprimer"}
                                                            >
                                                                <FaTrash size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {/* Total Price */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    {locale === "ar" ? "الإجمالي" : locale === "en" ? "Total" : "Total"}
                                </h3>
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                    <span className="text-lg text-gray-600">
                                        {locale === "ar" ? "المجموع" : locale === "en" ? "Subtotal" : "Sous-total"}
                                    </span>
                                    <span className="text-2xl font-bold text-(--main-color)">
                                        {totalPrice} {locale === "ar" ? "ج.م" : locale === "en" ? "USD" : "€"}
                                    </span>
                                </div>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={checkoutLoading || cartItems.length === 0}
                                    className="w-full px-6 py-3 bg-(--main-color) text-white rounded-lg font-bold text-lg hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {checkoutLoading 
                                        ? (locale === "ar" ? "جاري المعالجة..." : locale === "en" ? "Processing..." : "Traitement en cours...")
                                        : (locale === "ar" ? "إتمام الطلب" : locale === "en" ? "Checkout" : "Commander")
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </CustomContainer>
            </section>
        </>
    )
}

export default Cart
