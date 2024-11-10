import type { Expiration } from '@echo/model/constants/expiration'
import { WalletStatus } from '@echo/model/constants/wallet-status'
import type { Address } from '@echo/model/types/address'
import type { HexString } from '@echo/model/types/hex-string'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Slug } from '@echo/model/types/slug'
import type { Username } from '@echo/model/types/username'

export interface Actions {
  addWallet: (args: { message: string; signature: string; wallet: Address }) => Promise<void>
  cancelListing: (slug: Slug) => Promise<Listing>
  createListing: (args: Pick<Listing, 'items' | 'target'> & Record<'expiration', Expiration>) => Promise<Listing>
  getWalletStatus: (wallet: Address) => Promise<
    | {
        status: WalletStatus.NeedsSignature
        nonce: string
      }
    | {
        status: Exclude<WalletStatus, WalletStatus.NeedsSignature>
      }
  >
  getOfferByIdContract: (idContract: HexString) => Promise<Offer>
  rejectOffer: (slug: Slug) => Promise<Offer>
  searchCollections: (query: string) => Promise<SearchResult<Slug>[]>
  searchUsers: (query: string) => Promise<SearchResult<Username>[]>
}
