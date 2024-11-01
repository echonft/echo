import type { Slug } from '@echo/model/types/slug'
import { ApiPath } from '@echo/routing/path/api-path'

export const apiPathProvider = {
  ipfs: {
    proxy: new ApiPath<{ path: string }>({ path: '/ipfs/:path', secure: false })
  },
  listing: {
    cancel: new ApiPath<Record<'slug', Slug>>({ path: '/listing/:slug/cancel', secure: true }),
    create: new ApiPath({ path: '/listing', secure: true })
  },
  webhook: {
    echo: new ApiPath<Record<'chain', string>>({ path: '/webhook/:chain/echo', secure: false }),
    nftTransfer: new ApiPath<Record<'chain', string>>({ path: '/webhook/:chain/nft/transfer', secure: false })
  }
}
