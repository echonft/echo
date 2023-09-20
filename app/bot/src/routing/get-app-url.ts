import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getAppUrl(): string {
  const baseUrl = process.env.APP_URL
  if (isNilOrEmpty(baseUrl)) {
    throw new Error('.env should contain APP_URL')
  }
  return baseUrl
}
