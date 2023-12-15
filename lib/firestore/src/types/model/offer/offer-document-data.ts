import type { Offer } from '@echo/model/types/offer'

export interface OfferDocumentData extends Omit<Offer, 'expired'> {
  receiverItemsNftIds: string[]
  receiverItemsNftCollectionIds: string[]
  senderItemsNftIds: string[]
  senderItemsNftCollectionIds: string[]
}
