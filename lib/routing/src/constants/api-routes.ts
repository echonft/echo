import { ApiRoute } from '@echo/routing/services/api/api-route'

export const apiRoutes = {
  ipfs: {
    proxy: new ApiRoute<{ path: string }>('/ipfs/:path')
  },
  webhook: {
    echo: new ApiRoute('/webhook/echo'),
    nftTransfer: new ApiRoute('/webhook/nft/transfer')
  }
}
