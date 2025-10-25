// app/[locale]/layout.js  (SERVER COMPONENT)
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PopupProvider } from "../contexts/PopupContext";
import { Providers } from "./providers";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/src/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params: { locale } }) {
  return {
    title: "PORTAL | Book Luxury Chalets | Reserve Your Perfect Getaway Today",
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <PopupProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </PopupProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
