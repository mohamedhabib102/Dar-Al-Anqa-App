'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher({ screen }: { screen: 'mobile' | 'desktop' }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('LocaleSwitcher');
    const [isOpen, setIsOpen] = useState(false);

    const changeLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    const localeNames: Record<string, string> = {
        en: t('en'),
        ar: t('ar'),
        fr: t('fr')
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    ${screen === 'mobile' ? 'w-full mt-3 py-3 px-2 justify-between' : 'w-auto'}
                    flex items-center gap-2 lg:px-2 lg:py-2 px-1.5 py-1.5 rounded-lg  bg-(--main-color) hover:bg-(--main-color-rgb) text-white font-medium transition-all duration-300 shadow-lg cursor-pointer
                    `}
                aria-label={t('label')}
            >
                <div className="flex items-center gap-2">
                    {/* <FaGlobe className="text-lg" /> */}
                    <span>{localeNames[locale]}</span>
                </div>
                <FaChevronDown className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop to close dropdown when clicking outside */}
                    <div
                        className="fixed inset-0 z-50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown menu */}
                    <div className={`
                        ${screen === 'mobile' ? 'w-full mt-3 py-3 px-2' : 'w-auto'}
                        absolute top-full mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-50 min-w-[130px] animate-fadeIn
                        `}>
                        {routing.locales.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => changeLocale(loc)}
                                className={`w-full px-2.5 py-2 text-left transition-all duration-200 ${locale === loc
                                    ? 'bg-[#b9a127] text-white font-semibold'
                                    : 'language-btn-hover text-gray-200'
                                    } cursor-pointer rounded-lg`}
                            >
                                {localeNames[loc]}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
