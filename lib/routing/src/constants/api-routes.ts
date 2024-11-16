import { ApiRoute } from '@echo/routing/services/api/api-route'
import type { DiscordAuthQueryParams } from '@echo/routing/types/api/discord-auth-query-params'
import { discordAuthQueryParamsSchema } from '@echo/routing/validators/api/discord-auth-query-params-schema'

export const apiRoutes = {
  auth: {
    discord: new ApiRoute<never, DiscordAuthQueryParams>('/auth/discord', (params: DiscordAuthQueryParams) =>
      discordAuthQueryParamsSchema.parse(params)
    )
  },
  ipfs: {
    proxy: new ApiRoute<{ path: string }>('/ipfs/:path')
  },
  webhook: {
    echo: new ApiRoute('/webhook/echo'),
    nftTransfer: new ApiRoute('/webhook/nft/transfer')
  }
}
