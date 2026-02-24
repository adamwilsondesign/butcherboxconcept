import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import { SignupProvider } from "@/components/signup/SignupFlow";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ButcherBox — Premium Meat & Seafood Delivery",
  description:
    "100% grass-fed beef, free-range organic chicken, heritage pork & wild-caught seafood — shipped free to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-cream text-text-primary`}
      >
        <SignupProvider>
          <ClientShell />
          <div>{children}</div>
          <Footer />
        </SignupProvider>
      </body>
    </html>
  );
}
