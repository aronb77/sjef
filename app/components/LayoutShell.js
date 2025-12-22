"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutShell({ children }) {
    const pathname = usePathname();
    // Hide Header/Footer on dashboard routes
    const isDashboard = pathname?.startsWith("/dashboard");

    return (
        <>
            {!isDashboard && <Header />}
            {children}
            {!isDashboard && <Footer />}
        </>
    );
}
