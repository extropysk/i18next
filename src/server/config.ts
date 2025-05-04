import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'

import { I18nConfig } from '../types'

type Options = {
  keyPrefix?: string
}

export const createI18n = ({ defaultNS = 'general', locales, defaultLocale, res }: I18nConfig) => {
  async function initialize(locale: string, namespace: string | string[]) {
    const i18nInstance = createInstance()
    await i18nInstance.use(resourcesToBackend(res)).init({
      supportedLngs: locales,
      fallbackLng: defaultLocale,
      lng: locale,
      fallbackNS: defaultNS,
      defaultNS: defaultNS,
      ns: namespace,
    })
    return i18nInstance
  }

  async function getTranslation(
    locale: string,
    namespace: string | string[] = defaultNS,
    options: Options = {},
  ) {
    const i18nextInstance = await initialize(locale, namespace)
    return {
      t: i18nextInstance.getFixedT(
        locale,
        Array.isArray(namespace) ? namespace[0] : namespace,
        options.keyPrefix,
      ),
      i18n: i18nextInstance,
    }
  }

  return { getTranslation }
}
