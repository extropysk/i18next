import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest } from 'next/server'

import { I18nConfig } from '../types'

export const pathnameHasLocale = (request: NextRequest, config: I18nConfig) => {
  const { pathname } = request.nextUrl

  return config.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )
}

export const getLocale = (request: NextRequest, config: I18nConfig) => {
  const cookies = request.cookies
  const cookieLang = cookies.get(config.cookieName ?? 'i18next')?.value

  if (cookieLang) {
    return cookieLang
  }

  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, config.locales, config.defaultLocale)
}
