import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { NOT_READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { getListingItemsCollectionSlugs } from '@echo/model/helpers/listing/get-listing-items-collection-slugs'
import { eqNfts } from '@echo/model/helpers/nft/eq-nfts'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import type { Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type Nft } from '@echo/model/types/nft'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { now } from '@echo/utils/helpers/now'
import { andThen, filter, pipe } from 'ramda'

export async function assertListingIsNotADuplicate(args: { items: Nft[]; target: ListingTarget }) {
  const { items, target } = args
  const potentialDuplicates = await pipe(
    getListingsCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_LISTING_STATES),
    queryWhere('expiresAt', '>', now()),
    queryWhere('target.amount', '==', target.amount),
    queryWhere('target.collection.slug', '==', target.collection.slug),
    getQueryData,
    andThen(filter<Listing>(pipe(getListingItemsCollectionSlugs, eqListContent(getNftsCollectionSlugs(items)))))
  )()
  // compare the items with each potential duplicate
  let isDuplicate = false
  for (const potentialDuplicate of potentialDuplicates) {
    if (eqNfts(items, potentialDuplicate.items, true)) {
      isDuplicate = true
    }
  }
  if (isDuplicate) {
    return Promise.reject(Error('listing is a duplicate'))
  }
}
