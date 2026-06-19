import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "AJ Metals | Premium Traditional Brassware & Cookware, Kayamkulam",
  description: "Discover premium traditional brassware, pooja articles, event cookware, and everyday kitchen essentials at AJ Metals. 20-year legacy in Gold Bazar, Kayamkulam, Kerala. Quick order via WhatsApp.",
  keywords: "AJ Metals, AJ Metals Kayamkulam, Brassware Kerala, Nilavilakku, Uruli, Kayamkulam Gold Bazar, Kerala traditional cookware, Pooja items, Bronze Varpu, Copper bottle",
  authors: [{ name: "AJ Metals" }],
  openGraph: {
    title: "AJ Metals | Premium Traditional Brassware & Cookware",
    description: "Authentic handcrafted metalware from Gold Bazar, Kayamkulam. Browse catalog and order directly on WhatsApp.",
    url: "https://ajmetals.com",
    siteName: "AJ Metals",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg-light text-text-dark">
        {children}
      </body>
    </html>
  );
}
