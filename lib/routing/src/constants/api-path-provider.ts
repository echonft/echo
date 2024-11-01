import type { Slug } from '@echo/model/types/slug'
import { ApiPath } from '@echo/routing/path/api-path'
import type { HexString } from '@echo/utils/types/hex-string'
import { identity } from 'ramda'

export const apiPathProvider = {
  collection: {
    search: new ApiPath<never, Record<'q', string>>({
      path: '/search/collection',
      secure: false
    })
  },
  ipfs: {
    proxy: new ApiPath<{ path: string }>({ path: '/ipfs/:path', secure: false })
  },
  listing: {
    cancel: new ApiPath<Record<'slug', Slug>>({ path: '/listing/:slug/cancel', secure: true }),
    create: new ApiPath({ path: '/listing', secure: true })
  },
  offer: {
    getByIdContract: new ApiPath<Record<'idContract', HexString>>({
      path: '/offer/contract/:idContract',
      secure: true
    }),
    reject: new ApiPath<Record<'slug', Slug>>({ path: '/offer/:slug/reject', secure: true })
  },
  user: {
    search: new ApiPath<Record<'q', string>>({ path: '/search/user', secure: false, queryParamsMapper: identity })
  },
  webhook: {
    echo: new ApiPath<Record<'chain', string>>({ path: '/webhook/:chain/echo', secure: false }),
    nftTransfer: new ApiPath<Record<'chain', string>>({ path: '/webhook/:chain/nft/transfer', secure: false })
  }
}
