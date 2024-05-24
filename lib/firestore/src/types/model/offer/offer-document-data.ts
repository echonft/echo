import type { NftIndex } from '@echo/model/types/nft-index'
import type { Offer } from '@echo/model/types/offer'
import type { Slug } from '@echo/model/types/slug'

export interface OfferDocumentData extends Omit<Offer, 'readOnly'> {
  receiverItemIndexes: NftIndex[]
  receiverItemCollections: Slug[]
  senderItemIndexes: NftIndex[]
  senderItemCollections: Slug[]
}
