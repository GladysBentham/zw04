import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Base猜数字 - Base链上猜数字游戏",
  description: "在Base链上玩猜数字游戏，猜对即可获得奖励！仅需极低gas费用。",
  other: {
    'base:app_id': '69ba665b5b0dee671be77ec5',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="talentapp:project_verification" content="8573e511feaf4af57c60a7e47262b0766da325cd34db9394b17fabaefb99b96e75431ec142f9e6fe4506d829151508c30be3087cda6130ddf975768aeb624d22">
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
