import { NftApiRoutes } from '@echo/alchemy/constants/nft-api-routes'
import { getNftApiBaseUrl } from '@echo/alchemy/helpers/get-nft-api-base-url'

export function getNftApiRoute(route: NftApiRoutes, chainId: number) {
  return `${getNftApiBaseUrl(chainId)}${route}`
}
