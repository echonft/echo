import type { NftIndex } from '@echo/model/types/nft-index'
import type { Offer } from '@echo/model/types/offer'

export interface OfferDocumentData extends Omit<Offer, 'readOnly'> {
  receiverItemIndexes: NftIndex[]
  receiverItemCollections: Lowercase<string>[]
  senderItemIndexes: NftIndex[]
  senderItemCollections: Lowercase<string>[]
}
