"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";



const Login: React.FC = () => {
    return (
        <section className="flex items-center justify-center h-screen relative overflow-hidden bg-black">

            {/* Background Image with Parallax-like feel or just static high quality */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/auth-bg-1.png"
                    alt="auth background"
                    fill
                    priority
                    className="object-cover object-center opacity-85"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/40"></div>
            </div>

            {/* Decorative Yellow Glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>



            {/* Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-[93%] md:w-[480px]"
            >
                {/* Glassmorphism Card */}
                <div className="relative overflow-hidden backdrop-blur-[6px] bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">

                    {/* Decorative top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-(--main-color) to-transparent opacity-50"></div>

                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold text-white mb-3 tracking-tight"
                        >
                            مرحباً بك مجدداً
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 text-sm"
                        >
                            سجل دخولك للمتابعة في <span className="text-(--main-color) font-semibold">دار العنقاء</span>
                        </motion.p>
                    </div>

                    <form className="flex flex-col gap-5">
                        {/* Name */}
                        <div className="group">
                            <label className="block text-gray-300 text-xs font-medium mb-2 mr-1 transition-colors group-focus-within:text-(--main-color)">الأسم</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="محمد"
                                    className="w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-(--main-color)/50 focus:bg-black/40 focus:ring-1 focus:ring-(--main-color)/50 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="group">
                            <label className="block text-gray-300 text-xs font-medium mb-2 mr-1 transition-colors group-focus-within:text-(--main-color)">رقم الهاتف</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="+201234567890"
                                    className="w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-(--main-color)/50 focus:bg-black/40 focus:ring-1 focus:ring-(--main-color)/50 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="group">
                            <label className="block text-gray-300 text-xs font-medium mb-2 mr-1 transition-colors group-focus-within:text-(--main-color)">كلمة المرور</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-(--main-color)/50 focus:bg-black/40 focus:ring-1 focus:ring-(--main-color)/50 transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Role */}
                        <div className="group">
                            <label className="block text-gray-300 text-xs font-medium mb-2 mr-1 transition-colors group-focus-within:text-(--main-color)">نوع الحساب</label>
                            <div className="relative">
                                <select
                                    name="role"
                                    id="role"
                                    className="w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-(--main-color)/50 focus:bg-black/40 focus:ring-1 focus:ring-(--main-color)/50 transition-all duration-300 appearance-none"
                                >
                                    <option className="bg-gray-900 text-gray-300" value="user">مستخدم</option>
                                    <option className="bg-gray-900 text-gray-300" value="author">مؤلف</option>
                                    <option className="bg-gray-900 text-gray-300" value="publishhouse">دار نشر</option>
                                </select>
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(var(--main-color-rgb), 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="cursor-pointer mt-4 w-full bg-linear-to-r from-(--main-color) to-[#a08b21] text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg shadow-(--main-color)/20"
                        >
                            تسجيل الدخول
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default Login;
