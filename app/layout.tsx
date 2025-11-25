import { Rubik } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "دار العنقاء - عالم من الكتب بين يديك",
  description: "اكتشف مجموعة واسعة من الكتب في مختلف المجالات. تصفح، اشترِ، واقرأ كتبك المفضلة بكل سهولة من دار العنقاء الإلكترونية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${rubik.variable}`}>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
