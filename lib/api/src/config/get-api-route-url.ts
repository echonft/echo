import { ApiRoutes } from './api-routes'
import { getServerConfig } from './get-server-config'

/**
 * Get the API route complete URL. Will append the API URL before the route
 * @param route The route
 */
export function getApiRouteUrl(route: ApiRoutes): string {
  return `${getServerConfig().url}/${route}`
}
