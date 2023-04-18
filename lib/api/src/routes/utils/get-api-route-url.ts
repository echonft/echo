import { getServerConfig } from '../../config/get-server-config'
import { ApiRoutes } from '../constants/api-routes'

/**
 * Get the API route complete URL. Will append the API URL before the route
 * @param route The route
 */
export function getApiRouteUrl(route: ApiRoutes): string {
  return `${getServerConfig().url}/${route}`
}
