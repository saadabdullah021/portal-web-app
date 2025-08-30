"use client";

import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Components
import Navbar from "./components/Navbar";
import AuthNavbar from "./components/AuthNavbar";
import Footer from "./components/Footer";
import { PopupProvider } from "./contexts/PopupContext";
import { Providers } from './providers';

export const metadata = {
  title: "Portal",
  description: "Next.js project",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isAuthRoute, setIsAuthRoute] = useState(false);

  useEffect(() => {
    setIsAuthRoute(pathname?.startsWith("/auth"));
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <Providers>
          <I18nextProvider i18n={i18n}>
            {/* ✅ Wrap everything inside PopupProvider */}
            <PopupProvider>
              {isAuthRoute ? <AuthNavbar /> : <Navbar />}
              <main>{children}</main>
              {!isAuthRoute && <Footer />}
            </PopupProvider>
          </I18nextProvider>
        </Providers>
      </body>
    </html>
  );
}
