import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SignupProvider } from "@/components/signup/SignupFlow";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre",
  weight: ["400", "700"],
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
        className={`${inter.variable} ${libre.variable} font-sans antialiased bg-background text-text-dark`}
      >
        <SignupProvider>
          <Navbar />
          <div className="pt-[116px]">{children}</div>
          <Footer />
        </SignupProvider>
      </body>
    </html>
  );
}
