import { lowerCollectionAddress } from '@echo/firestore/helpers/converters/nft/lower-collection-address'
import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { map, modify, pipe } from 'ramda'

const key = 'senderItems'
type Key = typeof key
export function lowerSenderItemsAddresses<
  T extends OfferDocumentData | (Partial<WithFieldValue<Offer>> & Record<Key, OfferItem[]>)
>(offer: T): T {
  return modify<Key, OfferItem[], OfferItem[]>(
    key,
    map(modify<'nft', Nft, Nft>('nft', pipe(lowerCollectionAddress, lowerOwnerWalletAddress)))
  )(offer) as T
}
