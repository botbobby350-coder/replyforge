import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReplyForge — AI Cold Email Personalizer",
  description: "Paste a LinkedIn or company URL. Get a personalized cold email in seconds. No templates. No fluff. Just emails that convert.",
  openGraph: {
    title: "ReplyForge — AI Cold Email Personalizer",
    description: "Paste a LinkedIn or company URL. Get a personalized cold email in seconds.",
    url: "https://replyforge-beta.vercel.app",
    siteName: "ReplyForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReplyForge — AI Cold Email Personalizer",
    description: "Paste a LinkedIn or company URL. Get a personalized cold email in seconds.",
    creator: "@BotBobby28227",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
