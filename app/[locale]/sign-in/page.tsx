"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { ChangeEvent, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAuth } from "@/utils/contextapi";
import api from "@/utils/api";
import { TbLoader2 } from "react-icons/tb";
import Cookies from "js-cookie";


interface authData {
    username: string;
    phoneNumber: string;
    password: string;
    role: string;
}


const Login: React.FC = () => {
    // about translations 
    const locale = useLocale();
    const t = useTranslations("auth");


    // about login data
    const [message, setMessage] = useState<string>("");
    const [show, setShow] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [authData, setAuthData] = useState<authData>({
        username: "",
        phoneNumber: "",
        password: "",
        role: ""
    });

    // about auht
    const { login } = useAuth()


    /**
     * 
     
      Admin515
      201027227754
      Ahmed7000880


      athor
     201091435222
     hmbara7000


     publisher 
     كريمة بتاعت البهايهم
     102125554
    MMHhhh70000
    
     */

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthData({ ...authData, [name]: value });
    }

    const handeLogin = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("")
        try {
            setLoading(true);
            // validate data
            if (!authData.username || !authData.role) {
                setLoading(false);
                setMessage(t("errors.allFieldsRequired"));
                return;
            }
            const rex = /^\d{5,}$/g;
            if (!authData.phoneNumber || !rex.test(authData.phoneNumber)) {
                setLoading(false);
                setMessage(t("errors.phoneInvalid"));
                return;
            }

            // Password: only letters (a-z, A-Z) and numbers (0-9), minimum 8 characters
            const rexp = /^[A-Za-z0-9]{8,}$/;
            if (!authData.password || !rexp.test(authData.password)) {
                setLoading(false);
                setMessage(t("errors.passwordInvalid"));
                return;
            }


            console.log(authData);

            const res = await api.post("/api/Publish_House/login", authData)

            console.log(res);
            const userData = res.data;


            const data = {
                userId: userData.user_Id,
                role: userData.role,
                isAccepted: userData.isAccepted,
                token: "token"
            }
            login(data)

            if (data.role === "Publisher") {
                window.location.href = `/${locale}`
            } else if (data.role === "User") {
                window.location.href = `/${locale}`
            } else if (data.role === "Author") {
                window.location.href = `/${locale}`
            } else if (data.role === "Admin") {
                window.location.href = `/${locale}/dashboard`
            }
            setLoading(false);
            setAuthData({
                username: "",
                phoneNumber: "",
                password: "",
                role: ""
            })
            Cookies.set("isDone", "isDone");
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    return (
        <section
            className="flex items-center justify-center h-screen relative overflow-hidden bg-black">

            {/* Background Image with Parallax-like feel or just static high quality */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/bg-auth.jpg"
                    alt="authData background"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 w-[93%] md:w-[480px]"
            >
                {/* Glassmorphism Card */}
                <div className="relative overflow-y-auto max-h-[85vh] backdrop-blur-[6px] bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">

                    {/* Decorative top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-(--main-color) to-transparent opacity-50"></div>

                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold text-white mb-3 tracking-tight"
                        >
                            {t("title")}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-300 text-sm"
                        >
                            {t("description")}
                        </motion.p>
                    </div>
                    {message && (
                        <p className="w-full text-center text-sm text-white bg-red-500/30 border border-red-500/40 rounded-lg px-4 py-2 mb-4 transition">
                            {message}
                        </p>
                    )}
                    <form
                        onSubmit={handeLogin}
                        className="flex flex-col gap-5">
                        {/* Name */}
                        <div className="group">
                            <label className="block text-gray-300 text-sm font-medium mb-2 mr-1 transition-colors group-focus-within:text-(--main-color)">
                                {t("name")}
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder={locale === "ar" ? "محمد" : "Mohamed"}
                                    className="w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--main-color)/50 focus:bg-black/40 focus:ring-1 focus:ring-(--main-color)/50 transition-all duration-300"
                                    onChange={handleChange}
                                    value={authData.username}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="group">
                            <label className="block text-gray-300 text-sm font-medium mb-2 mr-1 transition-colors group-focus-within:text-(--main-color)">{t("phone")}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="+201234567890"
                                    className="w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--main-color)/50 focus:bg-black/40 focus:ring-1 focus:ring-(--main-color)/50 transition-all duration-300"
                                    onChange={handleChange}
                                    value={authData.phoneNumber}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="group">
                            <label className="block text-gray-300 text-sm font-medium mb-2 mr-1 transition-colors group-focus-within:text-(--main-color)">{t("password")}</label>
                            <div className="relative">
                                <input
                                    type={show ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    className="w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--main-color)/50 focus:bg-black/40 focus:ring-1 focus:ring-(--main-color)/50 transition-all duration-300"
                                    onChange={handleChange}
                                    value={authData.password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow((prev) => !prev)}
                                    className="cursor-pointer absolute inset-y-0 flex items-center justify-center px-3 text-gray-400 hover:text-white transition ltr:right-2 rtl:left-2"
                                    aria-label={show ? t("passwordHide") : t("passwordShow")}
                                >
                                    {show ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Role */}
                        <div className="group">
                            <label className="block text-gray-300 text-sm font-medium mb-2 mr-1 transition-colors group-focus-within:text-(--main-color)">{t("role")}</label>
                            <div className="relative">
                                <select
                                    name="role"
                                    id="role"
                                    className="w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--main-color)/50 focus:bg-black/40 focus:ring-1 focus:ring-(--main-color)/50 transition-all duration-150 appearance-none"
                                    onChange={handleChange}
                                    value={authData.role}
                                    required
                                >
                                    <option className="bg-gray-900 text-gray-300" value="" disabled>{locale === "ar" ? "اختر نوع الحساب" : locale === "en" ? "Select Account Type" : "Sélectionner le type de compte"}</option>
                                    <option className="bg-gray-900 text-gray-300" value="User">{t("roleDescription.user")}</option>
                                    <option className="bg-gray-900 text-gray-300" value="Author">{t("roleDescription.author")}</option>
                                    <option className="bg-gray-900 text-gray-300" value="Publisher">{t("roleDescription.publushhouse")}</option>
                                </select>
                                <div className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <Link href="/" className="cursor-pointer text-(--main-color)">
                            {t("togoHome")}
                        </Link>

                        <button
                            type="submit"
                            className="cursor-pointer mt-4 w-full bg-linear-to-r from-(--main-color) to-[#a08b21] text-white font-bold py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-200 shadow-lg shadow-(--main-color)/20"
                        >
                            {loading ? <TbLoader2 className="animate-spin text-center block m-auto w-6 h-6" /> : t("signUp")}
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default Login;
