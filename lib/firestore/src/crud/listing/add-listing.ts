import { CollectionName } from '../../constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '../../constants/default-expiration-time'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { assertListingItems } from '../../helpers/listing/assert/assert-listing-items'
import { assertListingTargets } from '../../helpers/listing/assert/assert-listing-targets'
import { firestore } from '../../services/firestore'
import { addListingToOffer } from '../offer/add-listing-to-offer'
import { getOffersForListing } from '../offer/get-offers-for-listing'
import { ListingItem, ListingTarget, UserDetails } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'
import dayjs from 'dayjs'
import { assoc, map, pipe, prop } from 'ramda'

interface NewListing {
  creator: Partial<UserDetails>
  items: NonEmptyArray<ListingItem>
  targets: NonEmptyArray<ListingTarget>
}

export async function addListing(listing: NewListing): Promise<string> {
  assertListingTargets(listing.targets)
  assertListingItems(listing.items)
  const reference = firestore().collection(CollectionName.LISTINGS).doc()
  const id = reference.id
  const offers = await getOffersForListing(listing.items, listing.targets)
  const newListing = pipe(
    assoc('id', id),
    assoc('createdAt', dayjs()),
    assoc('expiresAt', dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')),
    assoc('offersIds', map(prop('id'), offers)),
    assoc('state', 'OPEN')
  )(listing)
  await reference.set(listingDataConverter.toFirestore(newListing))
  // add listing to the offers (if any)
  for (const offer of offers) {
    await addListingToOffer(offer, id)
  }
  return id
}
