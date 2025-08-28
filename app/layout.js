import "./globals.css";
import Navbar from "../app/components/Navbar";
import Footer from "./components/Footer";
import { Providers } from './providers';
import I18nProvider from './components/I18nProvider';

export const metadata = {
  title: "Portal",
  description: "Next.js project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <I18nProvider>
            <Navbar />
            {children}
            <Footer/>
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
