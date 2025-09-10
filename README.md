# i18next

inspired by blogpost [i18n with Next.js 13/14/15 and app directory / App Router (an i18next guide)
](https://www.locize.com/blog/next-app-dir-i18n)

## Installation
`npm install @extropysk/i18next i18next react-i18next i18next-resources-to-backend i18next-browser-languagedetector`

## Get Started

### common config
```
import { I18nConfig } from "@extropysk/i18next";

export const I18N: I18nConfig = {
  defaultLocale: "en",
  locales: ["en", "sk"],
  defaultNS: "general",
  res: (locale: string, namespace: string | string[]) =>
    import(`./dictionaries/${locale}/${namespace}.json`),
};
```

### client config
```
"use client";
import { I18nProvider } from "@extropysk/i18next";
import { useParams } from "next/navigation";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import { I18N } from "...";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend(I18N.res))
  .init({
    supportedLngs: I18N.locales,
    fallbackLng: I18N.defaultLocale,
    fallbackNS: I18N.defaultNS,
    defaultNS: I18N.defaultNS,
    ns: ["validation", "general", "home"],
    lng: undefined,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: typeof window === "undefined" ? I18N.locales : [],
  });

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const params = useParams();

  return (
    <I18nProvider i18n={i18n} locale={params.locale as string}>
      {children}
    </I18nProvider>
  );
}
```

### usage
`const { t } = useTranslation();`

### server config
```
import "server-only";

import { createI18n } from "@extropysk/i18next/server";

import { I18N } from "...";

const { getTranslation } = createI18n(I18N);
```

### usage
`const { t } = await getTranslation(locale);`

### middleware (optional)
```
import { getLocale, pathnameHasLocale } from "@extropysk/i18next/server";
import { type NextRequest, NextResponse } from "next/server";

import { I18N } from "...";

// Matcher ignoring `/_next/` and `/api/` and svg files.
export const config = { matcher: ["/((?!api|_next|.*.svg|.*.png|.*.webp|.*.jpg|.*.json$).*)"] };

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathnameHasLocale(request, I18N)) {
    return;
  }

  const locale = getLocale(request, I18N);
  if (!locale) {
    return;
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
```
