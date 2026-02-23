import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SignupProvider } from "@/components/signup/SignupFlow";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ButcherBox — Meat Delivery",
  description: "Premium meat delivered to your door",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${cormorant.variable} font-sans antialiased bg-cream text-text-primary`}
      >
        <SignupProvider>
          <Navbar />
          <div className="pt-[104px]">{children}</div>
          <Footer />
        </SignupProvider>
      </body>
    </html>
  );
}
