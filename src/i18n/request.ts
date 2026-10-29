import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import pt from "../messages/pt.json";
import en from "../messages/en.json";

const messages = {
  pt,
  en,
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();

  const rawLocale = cookieStore.get("locale")?.value;
  const locale =
    rawLocale && rawLocale.toLowerCase().startsWith("pt") ? "pt" : "en";

  return {
    locale,
    messages: messages[locale],
  };
});
