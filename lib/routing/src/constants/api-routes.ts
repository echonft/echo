import { ApiRoute } from '@echo/routing/services/api/api-route'
import type { DiscordAuthQueryParams } from '@echo/routing/types/api/discord-auth-query-params'
import type { IpfsProxyQueryParams } from '@echo/routing/types/api/ipfs-proxy-query-params'
import { discordAuthQueryParamsSchema } from '@echo/routing/validators/api/discord-auth-query-params-schema'
import { identity } from 'ramda'

export const apiRoutes = {
  auth: {
    discord: new ApiRoute<never, DiscordAuthQueryParams>('/auth/discord', (params: DiscordAuthQueryParams) =>
      discordAuthQueryParamsSchema.parse(params)
    )
  },
  ipfs: {
    proxy: new ApiRoute<Record<'path', string>, IpfsProxyQueryParams>('/ipfs/:path', identity)
  },
  webhook: {
    echo: new ApiRoute('/webhook/echo'),
    nftTransfer: new ApiRoute('/webhook/nft/transfer')
  }
}
