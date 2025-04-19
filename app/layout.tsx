import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import NavbarWrapper from "@/components/navbarwrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "| MIU E-Library",
    template: "%s | MIU E-Library",
  },
  description: "Welcome to the MIU Ebook Lending System.",
  openGraph: {
    title: "MIU E-Library",
    description: "Welcome to the MIU Ebook Lending System.",
    siteName: "MIU E-Library",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIU E-Library",
    description: "Welcome to the MIU Ebook Lending System.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavbarWrapper />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
