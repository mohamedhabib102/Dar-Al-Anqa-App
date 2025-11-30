"use client";
import CustomContainer from "@/ui/CustomContainer";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
            <CustomContainer>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright */}
                    <div className="text-gray-500 text-sm font-medium">
                        &copy; {currentYear} {t('rights')}
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-[#1877F2] transition-colors transform hover:scale-110 duration-200">
                            <FaFacebook size={24} />
                        </Link>
                        <Link href="https://whatsapp.com" target="_blank" className="text-gray-400 hover:text-[#25D366] transition-colors transform hover:scale-110 duration-200">
                            <FaWhatsapp size={24} />
                        </Link>
                    </div>
                </div>
            </CustomContainer>
        </footer>
    );
};

export default Footer;
