import { lowerContractAddress } from '@echo/firestore/helpers/converters/collection/lower-contract-address'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing/listing-document-data'
import type { Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { map, modify } from 'ramda'

export function lowerTargetsCollectionAddress<
  T extends ListingDocumentData | (Partial<WithFieldValue<Listing>> & Record<'targets', ListingTarget[]>)
>(listing: T): T {
  return modify<'targets', ListingTarget[], ListingTarget[]>(
    'targets',
    map<ListingTarget, ListingTarget>(modify<'collection', Collection, Collection>('collection', lowerContractAddress))
  )(listing) as T
}
