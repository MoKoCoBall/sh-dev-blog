import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "prismjs/themes/prism-tomorrow.css";
import Head from "next/head";
import { PostData } from "./post/[slug]/page";

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
  title: "상상 이상",
  description: "상상 이상의 블로그",
  icons: {
    icon: "/favicon/favicon.svg",
  },
};

export default function RootLayout({
  children,
  post,
}: Readonly<{
  children: React.ReactNode;
  post?: PostData;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Head>
        <meta property="og:image" content="/thumbnail/thumbnail.png" />
        {post ? (
          <>
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.preview || ""} />
            <meta
              property="og:url"
              content={`https://sang-hee.dev/post/${post.slug}`}
            />
          </>
        ) : null}
      </Head>
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
