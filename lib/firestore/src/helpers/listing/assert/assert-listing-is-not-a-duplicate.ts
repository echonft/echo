import type { Items } from '@echo/model/types/item'
import { type ListingTarget } from '@echo/model/types/listing-target'

// FIXME we need to create functions to compare items (including ERC-20 tokens)
export async function assertListingIsNotADuplicate(_args: { items: Items; target: ListingTarget }) {
  // const { items, target } = args
  // const potentialDuplicates = await pipe(
  //   getListingsCollectionReference,
  //   queryWhere('state', 'in', NOT_READ_ONLY_LISTING_STATES),
  //   queryWhere('expiresAt', '>', now()),
  //   queryWhere('target.amount', '==', target.amount),
  //   queryWhere('target.collection.slug', '==', target.collection.slug),
  //   getQueryData,
  //   andThen(filter<Listing>(pipe(getListingItemsCollectionSlugs, eqListContent(getNftsCollectionSlugs(items)))))
  // )()
  // compare the items with each potential duplicate
  // for (const potentialDuplicate of potentialDuplicates) {
  //   if (eqOwnedNfts(items, potentialDuplicate.items)) {
  //     return Promise.reject(Error('listing is a duplicate'))
  //   }
  // }
}
