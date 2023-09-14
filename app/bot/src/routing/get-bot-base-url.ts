import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export const getBotBaseUrl = (): string => {
  const baseUrl = process.env.BASE_URL
  if (isNilOrEmpty(baseUrl)) {
    throw new Error('.env should contain BASE_URL')
  }
  return baseUrl
}
