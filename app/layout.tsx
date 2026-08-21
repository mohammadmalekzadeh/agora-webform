import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "آگورا | Agora — دیدگاه‌های ناشناس، اندیشه‌های شفاف",
  description:
    "بستری امن، بدون قضاوت و ناشناس برای دانشجویان تا با طرح دغدغه‌ها و تحلیل دیدگاه‌های متکثر در کنار دستیار هوش مصنوعی، به پختگی فکری جمعی دست یابند.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-bg text-text-primary antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
