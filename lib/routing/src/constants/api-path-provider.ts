import { ApiPath } from '@echo/routing/path/api-path'

export const apiPathProvider = {
  ipfs: {
    proxy: new ApiPath<{ path: string }>({ path: '/ipfs/:path', secure: false })
  },
  webhook: {
    echo: new ApiPath({ path: '/webhook/echo', secure: false }),
    nftTransfer: new ApiPath({ path: '/webhook/nft/transfer', secure: false })
  }
}
