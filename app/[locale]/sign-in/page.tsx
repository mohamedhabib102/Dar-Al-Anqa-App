// Updated Login Component with Steps, Category Selection, and Final Submit
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { ChangeEvent, useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAuth } from "@/utils/contextapi";
import api from "@/utils/api";
import { TbLoader2 } from "react-icons/tb";
import Cookies from "js-cookie";
import { fetchCategories } from "@/utils/GetAllCategory";

interface authData {
  username: string;
  phoneNumber: string;
  password: string;
  role: string;
}

/**
 
  Mohamed H. Mowafy
  Mowafy7000880
  010272284455


  Admin515
  010272284442
  Mohamed12345678

  
 */

interface Category {
  category_Id: number;
  category_Name: string;
}

const Login: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations("auth");

  const [step, setStep] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [authData, setAuthData] = useState<authData>({
    username: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { login, userData } = useAuth();

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const validateStepOne = () => {
    if (!authData.username || !authData.role) {
      setMessage(t("errors.allFieldsRequired"));
      return false;
    }

    const rex = /^\d{5,}$/g;
    if (!authData.phoneNumber || !rex.test(authData.phoneNumber)) {
      setMessage(t("errors.phoneInvalid"));
      return false;
    }

    const rexp = /^[A-Za-z0-9]{8,}$/;
    if (!authData.password || !rexp.test(authData.password)) {
      setMessage(t("errors.passwordInvalid"));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const body = {
        ...authData,
        categories: selectedCategories.map(String),
      };




      const res = await api.post("/api/Publish_House/login", body);

      console.log(res);


      const userData = res.data;

      const data = {
        userId: userData.user_Id,
        role: userData.role,
        isAccepted: userData.isAccepted,
        token: "token",
        isDone: userData.isDone,
      };

      login(data);

      if (userData.role === "Publisher") {
        window.location.href = `/${locale}`
      } else if (userData.role === "User") {
        window.location.href = `/${locale}`
      } else if (userData.role === "Author") {
        window.location.href = `/${locale}`
      } else if (userData.role === "Admin") {
        window.location.href = `/${locale}/dashboard`
      }
    } catch (error) {
      setMessage("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res));

  }, []);





  return (
    <section className="flex items-center justify-center h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-auth.jpg"
          alt="auth background"
          fill
          priority
          className="object-cover opacity-85"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-[93%] md:w-[480px]"
      >
        <div className="relative overflow-y-auto max-h-[85vh] backdrop-blur-[6px] bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <motion.h2 className="text-4xl font-bold text-white mb-3">
              {t("title")}
            </motion.h2>
          </div>

          {message && (
            <p className="w-full text-center text-sm text-white bg-red-500/30 border border-red-500/40 rounded-lg px-4 py-2 mb-4">
              {message}
            </p>
          )}

          {/* STEP 1: LOGIN FORM */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (validateStepOne()) {
                  setMessage("");
                  setStep(2);
                }
              }}
              className="flex flex-col gap-5"
            >
              <div className="group">
                <label className="text-gray-300 text-sm mb-2 block">{t("name")}</label>
                <input
                  type="text"
                  name="username"
                  className="outline-none cursor-pointer w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white"
                  onChange={handleChange}
                  value={authData.username}
                />
              </div>

              <div className="group">
                <label className="text-gray-300 text-sm mb-2 block">{t("phone")}</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="outline-none cursor-pointer w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white"
                  onChange={handleChange}
                  value={authData.phoneNumber}
                />
              </div>

              <div className="group">
                <label className="text-gray-300 text-sm mb-2 block">{t("password")}</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    className="outline-none cursor-pointer w-full px-5 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white"
                    onChange={handleChange}
                    value={authData.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((p) => !p)}
                    className={`
                      cursor-pointer absolute ${locale === "ar" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-gray-300
                      `}
                  >
                    {show ? <HiEyeOff /> : <HiEye />}
                  </button>
                </div>
              </div>

              <div className="group">
                <label className="text-gray-300 text-sm mb-2 block">{t("role")}</label>
                <select
                  name="role"
                  className="outline-none cursor-pointer w-full px-5 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white"
                  onChange={handleChange}
                  value={authData.role}
                >
                  <option className="text-gray-50" value="">{t("roleDescription.select")}</option>
                  <option className="text-gray-50" value="User">{t("roleDescription.user")}</option>
                  <option className="text-gray-50" value="Author">{t("roleDescription.author")}</option>
                  <option className="text-gray-50" value="Publisher">{t("roleDescription.publushhouse")}</option>
                </select>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-yellow-600 text-white font-bold py-4 rounded-xl"
              >
                {t("next")}
              </button>
            </form>
          )}

          {/* STEP 2: CATEGORY SELECTION */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <h3 className="text-white text-xl font-bold mb-3 text-center">
                {t("categories")}
              </h3>

              <div className="flex flex-col gap-3">
                {categories.map((cat, index) => (
                  <div
                    key={cat.category_Id}
                    onClick={() => toggleCategory(cat.category_Id)}
                    className={`cursor-pointer p-4 rounded-xl border text-white transition ${selectedCategories.includes(cat.category_Id)
                        ? "bg-yellow-600 border-yellow-400"
                        : "bg-black/20 border-white/10"
                      }`}
                  >
                    {cat.category_Name}
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                className="cursor-pointer w-full bg-green-600 text-white font-bold py-4 rounded-xl mt-4"
              >
                {loading ? (
                  <TbLoader2 className="animate-spin m-auto" />
                ) : (
                  t("register")
                )}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
