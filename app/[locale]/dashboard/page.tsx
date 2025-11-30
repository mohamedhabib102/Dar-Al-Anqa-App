"use client"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import OverlayApproveOrder from "@/ui/OverlayApproveOrder"

interface Order {
    id: number;
    bookName: string;
    clientName: string;
    status: string;
}

interface UserProfit {
    id: number;
    name: string;
    role: "Author" | "Publisher";
    profit: number;
    books: string[];
}

const Dashboard: React.FC = () => {
    const t = useTranslations("Dashboard");
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<UserProfit[]>([]);
    const [toggleApprove, setToggleApprove] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>(undefined);

    useEffect(() => {
        setOrders([
            { id: 1, bookName: "Book A", clientName: "Client 1", status: "Pending" },
            { id: 2, bookName: "Book B", clientName: "Client 2", status: "Pending" },
        ]);
        setUsers([
            { id: 1, name: "Author 1", role: "Author", profit: 1500, books: ["Book One", "Book Two"] },
            { id: 2, name: "Publisher 1", role: "Publisher", profit: 3000, books: ["Book Three", "Book Four", "Book Five"] },
            { id: 3, name: "Author 2", role: "Author", profit: 800, books: ["Book Six"] },
        ]);
    }, []);

    const handleApprove = (id: number) => {
        setSelectedOrderId(id);
        setToggleApprove(true);
    };

    const authors = users.filter(user => user.role === "Author");
    const publishers = users.filter(user => user.role === "Publisher");

    return (
        <div className="lg:p-6 md:p-4 p-0 space-y-8">
            <OverlayApproveOrder
                toggle={toggleApprove}
                setToggle={setToggleApprove}
                orderId={selectedOrderId}
            />

            {/* Authors Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">{t("users.author")}/{t("users.publisher")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="border rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">{user.name}</h3>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {user.role}
                                </span>
                            </div>
                            <div className="text-gray-600 space-y-1">
                                <p><span className="font-medium">{t("authors.profits")}:</span> {user.profit} EGP</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{t("authors.books")}:</span>
                                    <p className="text-sm text-gray-500">{user.books.length}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Withdrawal Requests Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">{t("withdrawalRequests.title")}</h2>
                {/* Mocking withdrawal requests for now */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">Author 1</h3>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Vodafone Cash</span>
                        </div>
                        <div className="text-gray-600 text-sm">
                            <p><span className="font-medium">{t("withdrawalRequests.amount")}:</span> 500 EGP</p>
                            <p><span className="font-medium">{t("withdrawalRequests.number")}:</span> 01000000000</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => handleApprove(999)} // Using dummy ID
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm transition"
                            >
                                {t("withdrawalRequests.approve")}
                            </button>
                            <button
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded text-sm transition"
                            >
                                {t("withdrawalRequests.reject")}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard;