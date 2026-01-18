"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Landing: React.FC = () => {
    const t = useTranslations("HomePage");
    const locale = useLocale();
    return (
        <section className="relative h-[calc(100vh-81px)]">
            {/* Background Image — optimized LCP */}
            <Image
                src="/images/bg-landing.png"
                alt="Landing Background"
                fill
                priority
                className="object-cover"
            />

            {/* Black Overlay */}
            <div className={`absolute inset-0 bg-black/50 dark:bg-black/60`} />

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4 max-w-4xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                    {t("landing.title")}
                    <span className="block mt-2 text-(--main-color) dark:text-(--main-color-rgb)">
                        {t("landing.subTitle")}
                    </span>
                </h1>

                <p className="text-base md:text-lg opacity-90 max-w-xl mx-auto leading-relaxed mb-8">
                    {t("landing.description")}
                </p>

                <Link
                    href={`/${locale}/books`}
                    className="group relative inline-flex items-center gap-2 bg-(--main-color) hover:bg-(--main-color-rgb) text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden"
                >
                    <span className="relative z-10">{t("landing.button")}</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </Link>

            </motion.div>
        </section>
    );
};

export default Landing;
