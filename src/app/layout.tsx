import type { Metadata, Viewport } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Garage Doors, Gate Motors & Electric Fences`,
    template: `%s | ${site.name}`,
  },
  description:
    "Fast, affordable garage door, gate motor and electric fence repairs and installations. Flexible appointments and expert service.",
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

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
        <Header />
        {children}
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
