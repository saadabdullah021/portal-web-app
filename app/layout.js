"use client";

import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PopupProvider } from "./contexts/PopupContext";
import { Providers } from './providers';

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(loggedIn);
    
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLanguage;
    
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <Providers>
          <I18nextProvider i18n={i18n}>
            <PopupProvider>
              <div className="min-h-screen">
                <Navbar isAuthenticated={isAuthenticated} />
                <main>{children}</main>
                <Footer />
              </div>
            </PopupProvider>
          </I18nextProvider>
        </Providers>
      </body>
    </html>
  );
}
