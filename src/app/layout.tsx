import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "prismjs/themes/prism-tomorrow.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sang-hee-kim.com/"),
  title: "상상 이상",
  description: "상상 이상의 블로그",
  icons: {
    icon: "/favicon/favicon.svg",
  },
  openGraph: {
    title: "상상 이상",
    description: "상상 이상의 블로그",
    url: "https://sang-hee-kim.com/",
    type: "website",
    images: [
      {
        url: "/thumbnail/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "상상 이상의 썸네일",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
