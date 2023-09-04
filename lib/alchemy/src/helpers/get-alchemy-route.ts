import { AlchemyRoutes } from '../constants/routes'
import { getBaseUrl } from './get-base-url'

export function getAlchemyRoute(route: AlchemyRoutes) {
  return new URL(`${getBaseUrl()}${route}`)
}
