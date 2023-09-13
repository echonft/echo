import type { NftAttribute } from '@echo/ui/types/model/nft-attribute'
import type { NftCollection } from '@echo/ui/types/model/nft-collection'
import type { NftTokenType } from '@echo/ui/types/model/nft-token-type'
import type { User } from '@echo/ui/types/model/user'
import type { Wallet } from '@echo/ui/types/model/wallet'

export interface Nft {
  id: string
  attributes: NftAttribute[]
  balance: number
  blurUrl?: URL
  collection: NftCollection
  name: string
  openSeaUrl?: URL
  owner: User & { wallet: Wallet }
  pictureUrl: URL
  thumbnailUrl: URL
  tokenId: number
  tokenType: NftTokenType
}
