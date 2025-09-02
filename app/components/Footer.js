"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import logo from "../../public/portal-logo.svg";
import amex from "../../public/images/amex.png";
import applepay from "../../public/images/applepay.png";
import mada from "../../public/images/mada.png";
import visa from "../../public/images/visa-mastercard.png";
import tabby from "../../public/images/tabby.png";
import tamara from "../../public/images/tamara.png";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
     const { i18n, t } = useTranslation("home");
  
  
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-12 lg:px-20 py-10 grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-3 lg:mb-5">
            <Image
              src={logo}
              alt="Portal Logo"
              width={86}
              height={32}
              priority
            />
          </div>
          <p className={`text-sm leading-relaxed  text-[#777E90]
            ${i18n.language === "ar" ? " lg:max-w-[220px]  " : " lg:min-w-xs "}
            `}>
        {t("footer.description")}
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:ml-24">
          <h4 className="font-semibold mb-6 relative inline-block">
            {t("footer.quick_links")}
            <span className="block h-0.5 w-full bg-[#14189c] mt-1"></span>
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/terms-conditions" className="hover:text-[#14189c] text-[#777E90] font-medium transition">
                {t("footer.terms")}
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-[#14189c] text-[#777E90] font-medium transition">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link href="/cancellation-policy" className="hover:text-[#14189c] text-[#777E90] font-medium transition">
                {t("footer.cancle_policy")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:ml-8">
          <h4 className="font-semibold mb-6 relative inline-block">
            {t("footer.contact")}
            <span className="block h-0.5 w-full bg-[#14189c] mt-1"></span>
          </h4>
          <div className="flex items-center gap-3 pb-3">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">

            <Phone className="w-5 h-5 text-[#14189c]" />
            </span>
            <a
              href="tel:+966111110000"
              className="text-sm hover:text-[#14189c] text-[#777E90] font-medium transition"
            >
              +966 111110000
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">

            <Mail className="w-5 h-5 text-[#14189c]" />
            </span>
            <a
              href="mailto:info@portal.com.sa"
              className="text-sm hover:text-[#14189c] text-[#777E90] font-medium transition"
            >
              info@portal.com.sa
            </a>
          </div>
        </div>

        {/* Payment Methods & Social */}
        <div className="">
          <h4 className="font-semibold mb-6 lg:mb-4 relative inline-block">
            {t("footer.payment_method")}
            <span className="block h-0.5 w-full bg-[#14189c] mt-1"></span>
          </h4>
          <div className="flex flex-wrap items-center gap-2 mb-4 pt-2">

            <span className="bg-gray-100 p-2 rounded-md">
            

            <Image
              src={mada}
              alt="Mada payment method accepted"
              width={50}
              height={30}
              />
              </span>

               <span className="bg-gray-100 p-2 rounded-md">

            <Image
              src={visa}
              alt="Visa and Mastercard payment methods accepted"
              width={50}
              height={30}
              />
              </span>
               <span className="bg-gray-100 p-2 rounded-md">

            <Image
              src={tamara}
              alt="Tamara buy now pay later accepted"
              width={50}
              height={30}
              />
              </span>
               <span className="bg-gray-100 p-2 rounded-md">

            <Image
              src={tabby}
              alt="Tabby buy now pay later accepted"
              width={50}
              height={30}
              />
              </span>
               <span className="bg-gray-100 p-2 rounded-md">

            <Image
              src={amex}
              alt="Amex payment method accepted"
              width={50}
              height={10}
              />
              </span>
              
               <span className="bg-gray-100 p-2 rounded-md">

            <Image
              src={applepay}
              alt="Apple Pay accepted"
              width={50}
              height={10}
              />
              </span>
            
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 pt-4 lg:pt-2 ">
            <Link
              href="https://wa.me/966111110000"
              aria-label="Contact us on WhatsApp"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#14189c] hover:text-white transition"
            >
              <MessageCircle className="w-5 h-5 " />
            </Link>
            <Link
              href="https://instagram.com/portal"
              aria-label="Follow us on Instagram"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#14189c] hover:text-white transition"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com/portal"
              aria-label="Follow us on Twitter"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#14189c] hover:text-white transition"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://facebook.com/portal"
              aria-label="Follow us on Facebook"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#14189c] hover:text-white transition"
            >
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 py-5 text-center text-sm text-[#777E90]">
      {t("footer.rights")}
      </div>
    </footer>
  );
}