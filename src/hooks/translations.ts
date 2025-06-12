import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useTranslation as useTranslationOrg } from 'react-i18next'
import { useI18n } from '../components'

type Options = {
  keyPrefix?: string
}

const runsOnServerSide = typeof window === 'undefined'

export function useTranslation(ns?: string, options: Options = {}) {
  const { cookieName, locale } = useI18n()
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  const [cookies, setCookie] = useCookies([cookieName])
  if (runsOnServerSide && locale && i18n.resolvedLanguage !== locale) {
    i18n.changeLanguage(locale)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!locale || i18n.resolvedLanguage === locale) return
      i18n.changeLanguage(locale)
    }, [locale, i18n])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies.i18next === locale) return
      setCookie(cookieName as string, locale, { path: '/' })
    }, [locale, cookies.i18next, setCookie, cookieName])
  }

  return ret
}
