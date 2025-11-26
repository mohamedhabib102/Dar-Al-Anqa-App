"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Landing: React.FC = () => {
    return (
        <section className="relative h-[calc(100vh-81px)]">
            {/* Background Image — optimized LCP */}
            <Image
                src="/images/bg-landing.jpg"
                alt="Landing Background"
                fill
                priority
                className="object-cover"
            />

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-[90%] lg:w-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center px-4"
            >
                <h3 className="text-5xl  font-bold text-(--main-color)">
                    مرحبا بك في دار العنقاء
                </h3>

                <p className="text-lg lg:w-[420px] md:w-96 w-auto m-auto leading-7 mt-4">
                    اكتشف مجموعة واسعة من الكتب في مختلف المجالات. تصفح، اشترِ، واقرأ
                    كتبك المفضلة بكل سهولة من دار العنقاء الإلكترونية.
                </p>
            </motion.div>
        </section>
    );
};

export default Landing;
