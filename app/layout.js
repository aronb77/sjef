import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sjef.ai - De AI-collega voor de bouw",
  description: "Sjef regelt de kantoortroep. Jij het vakwerk.",
};

import BlueprintLines from "./components/BlueprintLines";
import LayoutShell from "./components/LayoutShell";

export default function RootLayout({ children }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
        <BlueprintLines />
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
