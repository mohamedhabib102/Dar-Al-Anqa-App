import { Rubik } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { PopupProvider } from "@/utils/popupContext";
import PopupMessage from "@/layout/PopupMessage";
import Footer from "@/layout/Footer";
import { AuthProvider } from "@/utils/contextapi";
import type { Metadata } from "next";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "  عالم من الكتب بين يديك - Je lis ",
  description: "اكتشف مجموعة واسعة من الكتب في مختلف المجالات...",
};


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();


  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${rubik.variable}`}>
      <body className={`antialiased flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <PopupProvider>
            <AuthProvider>
            <div className="grow">
              {children}
            </div>
            </AuthProvider>
            <PopupMessage />
            <Footer />
          </PopupProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
