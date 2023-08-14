import { ApiRoutes } from '../constants/api-routes'
import { isNilOrEmpty } from '@echo/utils'

/**
 * Get an API route with param URL
 * @param route The route
 * @param param
 */
export const getApiRouteWithParamUrl = (route: ApiRoutes, param: string): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (isNilOrEmpty(apiUrl)) {
    throw new Error('.env should contain NEXT_PUBLIC_API_URL')
  }
  return `${apiUrl}/${route}/${param}`
}
