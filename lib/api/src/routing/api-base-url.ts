import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function apiBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/api'
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (isNilOrEmpty(apiUrl)) {
    throw new Error('.env should contain NEXT_PUBLIC_API_URL')
  }
  return apiUrl
}
