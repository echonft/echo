import { ApiRoutes } from '../constants/api-routes'
import { isNilOrEmpty } from '@echo/utils'

/**
 * Get the API route complete URL. Will append the API URL before the route
 * @param route The route
 */
export const getApiRouteUrl = (route: ApiRoutes): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (isNilOrEmpty(apiUrl)) {
    throw new Error('.env should contain NEXT_PUBLIC_API_URL')
  }
  return `${apiUrl}/${route}`
}
