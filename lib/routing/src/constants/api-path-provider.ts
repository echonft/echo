import { ApiPath } from '@echo/routing/path/api-path'

export const apiPathProvider = {
  ipfs: {
    proxy: new ApiPath<{ path: string }>({ path: '/ipfs/:path', secure: false })
  },
  webhook: {
    echo: new ApiPath<Record<'chain', string>>({ path: '/webhook/:chain/echo', secure: false }),
    nftTransfer: new ApiPath<Record<'chain', string>>({ path: '/webhook/:chain/nft/transfer', secure: false })
  }
}
