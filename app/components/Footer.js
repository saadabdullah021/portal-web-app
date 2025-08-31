// components/Footer.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/portal-logo.svg"; // apna logo yahan daalna
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation('home');
  return (
    <footer className="w-full border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-22 py-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center space-x-2">
           <div className="w-[86px] h-8 relative">
               <Image 
                 src={logo} 
                 alt="Portal Logo" 
                 fill 
                 className="object-contain"
               />
  </div>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-2 font-dm-sans font-bold gap-x-16 gap-y-4 text-center md:grid-cols-4 md:text-left">
            <Link
              href="#"
              className="text-sm text-[#777E90] transition hover:text-blue-800"
            >
              Menu Item
            </Link>
            <Link
              href="#"
              className="text-sm text-[#777E90] transition hover:text-blue-800"
            >
              Menu Item
            </Link>
            <Link
              href="#"
              className="text-sm text-[#777E90] transition hover:text-blue-800"
            >
              Menu Item
            </Link>
            <Link
              href="#"
              className="text-sm text-[#777E90] transition hover:text-blue-800"
            >
              Menu Item
            </Link>
            <Link
              href="#"
              className="text-sm text-[#777E90] transition hover:text-blue-800"
            >
              Menu Item
            </Link>
            <Link
              href="#"
              className="text-sm text-[#777E90] transition hover:text-blue-800"
            >
              Menu Item
            </Link>
            <Link
              href="#"
              className="text-sm text-[#777E90] transition hover:text-blue-800"
            >
              Menu Item
            </Link>
            <Link
              href="#"
              className="text-sm text-[#777E90] transition hover:text-blue-800"
            >
              Menu Item
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10  pt-6 text-center md:text-left">
          <p className="text-sm text-[#777E90] font-bold font-dm-sans">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
