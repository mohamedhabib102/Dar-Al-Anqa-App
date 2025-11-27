import { AuthProvider } from "@/utils/contextapi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "  عالم من الكتب بين يديك - Je lis ",
  description: "اكتشف مجموعة واسعة من الكتب في مختلف المجالات...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
