import { AlchemyRoutes } from '@echo-alchemy/constants/alchemy-routes'
import { getBaseUrl } from '@echo-alchemy/helpers/get-base-url'

export function getAlchemyRoute(route: AlchemyRoutes) {
  return new URL(`${getBaseUrl()}${route}`)
}
