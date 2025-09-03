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
  // ⚡ abhi ke liye dummy state
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // 👇 yahan pe baad me actual login status ayega
    // abhi ke liye localStorage se check kar rahe hain
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <html lang="en">
      <body>
        <Providers>
          <I18nextProvider i18n={i18n}>
            <PopupProvider>
              <Navbar isAuthenticated={isAuthenticated} />
              <main>{children}</main>
               <Footer />
            </PopupProvider>
          </I18nextProvider>
        </Providers>
      </body>
    </html>
  );
}
