import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sjef.ai - De AI-collega voor de bouw",
  description: "Sjef regelt de kantoortroep. Jij het vakwerk.",
};

import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={inter.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
