import { lowerCollectionAddress } from '@echo/firestore/helpers/converters/nft/lower-collection-address'
import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { Nft } from '@echo/model/types/nft'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { map, modify, pipe } from 'ramda'

export function lowerItemsAddresses<
  T extends ListingDocumentData | (Partial<WithFieldValue<Listing>> & Record<'items', ListingItem[]>)
>(listing: T): T {
  return modify<'items', ListingItem[], ListingItem[]>(
    'items',
    map<ListingItem, ListingItem>(
      pipe<[ListingItem], ListingItem, ListingItem>(
        modify<'nft', Nft, Nft>('nft', lowerCollectionAddress),
        modify<'nft', Nft, Nft>('nft', lowerOwnerWalletAddress)
      )
    )
  )(listing) as T
}
