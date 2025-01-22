import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: './fonts/inter/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/inter/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/inter/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/inter/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  adjustFontFallback: 'Arial',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  ...DATA.seo
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900`}
      >
        {children}
      </body>
    </html>
  );
}
