import { isNilOrEmpty } from '@echo/utils'

export const getApiBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (isNilOrEmpty(apiUrl)) {
    throw new Error('.env should contain NEXT_PUBLIC_API_URL')
  }
  return apiUrl
}
