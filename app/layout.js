"use client";
import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
import Navbar from "../app/components/Navbar";
// import Footer from "../components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nextProvider i18n={i18n}>
          <Navbar />
          {children}
     
        </I18nextProvider>
      </body>
    </html>
  );
}
