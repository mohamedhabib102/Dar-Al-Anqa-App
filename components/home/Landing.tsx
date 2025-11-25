"use client"
import { motion } from "framer-motion";




const Landing: React.FC = () => {
    return (
        <section className="relative bg-[url('/images/bg-landing.jpg')] h-[calc(100vh-81px)] bg-cover">
            <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
            <motion.div 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative top-1/2 left-1/2 -translate-1/2 z-20 text-white text-center">
                <h3 className="text-5xl font-bold text-(--main-color)"> مرحبا بك في دار العنقاء </h3>
                <p className="text-lg lg:w-[420px] md:w-96 w-auto m-auto leading-7 mt-4"> اكتشف مجموعة واسعة من الكتب في مختلف المجالات. تصفح، اشترِ، واقرأ كتبك المفضلة بكل سهولة من دار العنقاء الإلكترونية.</p>
            </motion.div>
        </section>
    )
}
export default Landing;
