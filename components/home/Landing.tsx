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
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-[90%] lg:w-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center px-4"
            >
                <h3 className="text-5xl  font-bold text-white dark:text-gray-100">
                    {t("landing.title")}  '<span className="text-(--main-color) dark:text-(--main-color-rgb)">{t("landing.subTitle")}</span>'
                </h3>

                <p className="text-lg lg:w-[420px] md:w-96 w-auto m-auto leading-7 mt-4">
                    {t("landing.description")}
                </p>

                <Link
                    href={`/${locale}/books`}
                    className="block w-fit mx-auto cursor-pointer transition duration-300 bg-(--main-color) dark:bg-(--main-color-rgb) hover:bg-(--main-color-rgb) text-white py-2 px-4 rounded mt-4">{t("landing.button")}
                </Link>
            </motion.div>
        </section>
    );
};

export default Landing;
