import { NextResponse } from "next/server";

const locales = ["en", "ar"];
const LOCALE_COOKIE = "i18nextLng";

function detectPreferredLocale(req) {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie === "en" || cookie === "ar") return cookie;

  const al = req.headers.get("accept-language")?.toLowerCase() || "";
  return al.startsWith("ar") ? "ar" : "en";
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // already localized?
  if (
    locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  ) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${detectPreferredLocale(req)}${
    pathname === "/" ? "" : pathname
  }`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\.).*)"],
};
