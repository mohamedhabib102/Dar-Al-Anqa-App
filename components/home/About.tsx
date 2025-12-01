"use client";
import CustomContainer from "@/ui/CustomContainer";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const About = () => {
    const t = useTranslations('About');

    return (
        <section className="py-20 bg-gray-50" id="about">
            <CustomContainer>
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 relative">
                        {t('title')}
                        <span className="block w-16 h-1 bg-(--main-color) mx-auto mt-2 rounded-full"></span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Address Card */}
                    <div className="bg-white  p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group border border-gray-100">
                        <div className="w-16 h-16 bg-(--main-color) rounded-full flex items-center justify-center mb-6 group-hover:bg-(--main-color) transition-colors duration-300">
                            <FaMapMarkerAlt className="text-white text-2xl transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
                        <p className="text-gray-600">
                            {t('address')}
                        </p>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-white  p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group border border-gray-100">
                        <div className="w-16 h-16 bg-(--main-color) rounded-full flex items-center justify-center mb-6 group-hover:bg-(--main-color) transition-colors duration-300">
                            <FaPhone className="text-white text-2xl transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
                        <p className="text-gray-600" dir="ltr">
                            {t('phone')}
                        </p>
                    </div>

                    {/* Email Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-gray-100">
                        <div className="w-16 h-16 bg-(--main-color)  rounded-full flex items-center justify-center mb-6 group-hover:bg-(--main-color) transition-colors duration-300">
                            <FaEnvelope className=" text-2xl text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
                        <p className="text-gray-600">
                            {t('email')}
                        </p>
                    </div>
                </div>
            </CustomContainer>
        </section>
    );
};

export default About;
