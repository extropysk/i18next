import { createContext, ReactNode, useContext } from 'react'

import { i18n } from 'i18next'
import { I18nextProvider } from 'react-i18next'

type I18n = {
  cookieName: string
  locale: string
}

type Props = {
  children: ReactNode
  i18n: i18n
  cookieName?: string
  locale: string
}

const I18nContext = createContext<I18n | null>(null)

export function I18nProvider({ children, i18n, locale, cookieName = 'i18next' }: Props) {
  const config: I18n = {
    cookieName,
    locale,
  }

  return (
    <I18nContext.Provider value={config}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
