import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Static for now, we'll change this later
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    home: (await import(`../../locales/${locale}/home.json`)).default,
  };
  return {
    locale,
    messages,
  };
});
