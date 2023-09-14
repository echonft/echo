import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyBaseUrl } from '@echo/alchemy/helpers/get-alchemy-base-url'

export function getAlchemyRoute(route: AlchemyRoutes) {
  return new URL(`${getAlchemyBaseUrl()}${route}`)
}
