// import { ReadCallback, Resource, ResourceKey } from 'i18next'

// type ImportFunction<L, N> =
//   | ((language: L, namespace: N, callback: ReadCallback) => void)
//   | ((language: L, namespace: N) => Promise<ResourceKey | boolean | null | undefined>)

export type I18nConfig = {
  locales: string[]
  defaultLocale: string
  defaultNS?: string
  cookieName?: string
  //   res: Resource | ImportFunction<string, string>
}
