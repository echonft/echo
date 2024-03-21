import { lowerCollectionAddress } from '@echo/firestore/helpers/converters/nft/lower-collection-address'
import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { map, modify, pipe } from 'ramda'

const key = 'items'
type Key = typeof key
export function lowerItemsAddresses<
  T extends ListingDocumentData | (Partial<WithFieldValue<Listing>> & Record<Key, ListingItem[]>)
>(listing: T): T {
  return modify<Key, ListingItem[], ListingItem[]>(
    key,
    map(modify<'nft', Nft, Nft>('nft', pipe(lowerCollectionAddress, lowerOwnerWalletAddress)))
  )(listing) as T
}
