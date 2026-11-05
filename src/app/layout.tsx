import { siteMetadata, siteViewport } from "@/lib/seo";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppWidget from "@/components/whatsapp/Whatsappwidget";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-ZA"
      className={`${sora.variable} ${manrope.variable}`}
    >
      <body>
        <LocalBusinessJsonLd />
        <Header />
        {children}
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
