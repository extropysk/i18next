'use client'

import { createContext, ReactNode, useContext } from 'react'

import { I18nConfig } from '../types'

type I18n = {
  locales: string[]
  defaultLocale: string
  defaultNS: string
  cookieName: string
}

type Props = {
  children: ReactNode
  config: I18nConfig
}

const I18nContext = createContext<I18n | null>(null)

export function I18nProvider({
  children,
  config: { locales, defaultLocale, defaultNS = 'general', cookieName = 'i18next' },
}: Props) {
  const config: I18n = {
    locales,
    defaultLocale,
    defaultNS,
    cookieName,
  }

  return <I18nContext.Provider value={config}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
