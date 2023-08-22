import { CollectionName } from '../../constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '../../constants/default-expiration-time'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { assertOfferItems } from '../../helpers/offer/assert-offer-items'
import { firestore } from '../../services/firestore'
import { ListingTarget } from '../../types/model/listing-target'
import { OfferItem } from '../../types/model/offer-item'
import { UserDetails } from '../../types/model/user-details'
import { getOffersForListing } from '../offer/get-offers-for-listing'
import { NonEmptyArray } from '@echo/utils'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

interface NewListing {
  creator: UserDetails
  items: NonEmptyArray<OfferItem>
  targets: NonEmptyArray<ListingTarget>
}

export const addListing = async (listing: NewListing): Promise<string> => {
  assertOfferItems(listing.items)
  const reference = firestore().collection(CollectionName.LISTINGS).doc()
  const id = reference.id
  const offers = await getOffersForListing(listing.items, listing.targets)
  const newListing = pipe(
    assoc('id', id),
    assoc('createdAt', dayjs()),
    assoc('expiresAt', dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')),
    assoc('offers', offers),
    assoc('postedAt', undefined),
    assoc('state', 'OPEN'),
    assoc('swaps', [])
  )(listing)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await reference.set(listingDataConverter.toFirestore(newListing))
  return id
}
