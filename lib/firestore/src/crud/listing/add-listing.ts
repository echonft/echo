import { CollectionName } from '../../constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '../../constants/default-expiration-time'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { assertListingItems } from '../../helpers/listing/assert-listing-items'
import { assertListingTargets } from '../../helpers/listing/assert-listing-targets'
import { firestore } from '../../services/firestore'
import { ListingItem } from '../../types/model/listing-item'
import { ListingTarget } from '../../types/model/listing-target'
import { UserDetails } from '../../types/model/user-details'
import { addListingToOffer } from '../offer/add-listing-to-offer'
import { getOffersForListing } from '../offer/get-offers-for-listing'
import { NonEmptyArray } from '@echo/utils'
import dayjs from 'dayjs'
import { assoc, map, pipe, prop } from 'ramda'

interface NewListing {
  creator: UserDetails
  items: NonEmptyArray<ListingItem>
  targets: NonEmptyArray<ListingTarget>
}

export const addListing = async (listing: NewListing): Promise<string> => {
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
    assoc('postedAt', undefined),
    assoc('state', 'OPEN')
  )(listing)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await reference.set(listingDataConverter.toFirestore(newListing))
  // add listing to the offers (if any)
  for (const offer of offers) {
    await addListingToOffer(offer, id)
  }
  return id
}
