import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { compareItems } from '@echo/firestore/helpers/item/compare-items'
import { NOT_READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { getNftsCollectionSlugs } from '@echo/model/helpers/nft/get-nfts-collection-slugs'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { type Nft } from '@echo/model/types/nft'
import { contentEq } from '@echo/utils/fp/content-eq'
import { now } from '@echo/utils/helpers/now'
import { filter, pipe, prop } from 'ramda'

export async function assertListingIsNotADuplicate(items: Nft[], target: ListingTarget) {
  const potentialDuplicates = await pipe(
    getListingsCollectionReference,
    queryWhere('state', 'in', NOT_READ_ONLY_LISTING_STATES),
    queryWhere('expiresAt', '>', now()),
    queryWhere('target.amount', '==', target.amount),
    queryWhere('target.collection.slug', '==', target.collection.slug),
    getQueryData,
    filter(pipe(prop('itemCollections'), contentEq(getNftsCollectionSlugs(items))))
  )()
  // compare the items with each potential duplicate
  for (const potentialDuplicate of potentialDuplicates) {
    if (compareItems(items, potentialDuplicate.items)) {
      throw Error('listing is a duplicate')
    }
  }
}
