// app/[locale]/layout.js  (SERVER COMPONENT)
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PopupProvider } from "../contexts/PopupContext";
import { Providers } from "./providers";
import { cookies } from "next/headers";
import I18nProvider from "../components/I18nProvider";

export const dynamic = "force-static";

export async function generateMetadata({ params: { locale } }) {
  return {
    title: "PORTAL | Book Luxury Chalets | Reserve Your Perfect Getaway Today",
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

export default function RootLayout({ children, params: { locale } }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  // Optional: read auth on server (delete if you don’t need it here)
  const isAuthenticated = cookies().get("isLoggedIn")?.value === "true";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <Providers>
          <I18nProvider locale={locale}>
            <PopupProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar isAuthenticated={isAuthenticated} />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </PopupProvider>
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
