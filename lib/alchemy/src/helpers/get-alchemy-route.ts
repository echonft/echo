import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyBaseUrl } from '@echo/alchemy/helpers/get-alchemy-base-url'

export function getAlchemyRoute(route: AlchemyRoutes, chainId: number) {
  return `${getAlchemyBaseUrl(chainId)}${route}`
}
