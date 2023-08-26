import { CollectionName } from '../../constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '../../constants/default-expiration-time'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { assertOfferItems } from '../../helpers/offer/assert-offer-items'
import { firestore } from '../../services/firestore'
import { OfferItem } from '../../types/model/offer-item'
import { UserDetails } from '../../types/model/user-details'
import { addOfferToListing } from '../listing/add-offer-to-listing'
import { getListingsForOffer } from '../listing/get-listings-for-offer'
import { findOfferById } from './find-offer-by-id'
import { NonEmptyArray } from '@echo/utils'
import dayjs from 'dayjs'
import { assoc, isEmpty, pipe } from 'ramda'

interface NewOffer {
  receiver: UserDetails
  receiverItems: NonEmptyArray<OfferItem>
  sender: UserDetails
  senderItems: NonEmptyArray<OfferItem>
}

export const addOffer = async (offer: NewOffer): Promise<string> => {
  const reference = firestore().collection(CollectionName.OFFERS).doc()
  assertOfferItems(offer.receiverItems)
  assertOfferItems(offer.senderItems)
  const offerId = reference.id
  const newOffer = pipe(
    assoc('id', offerId),
    assoc('createdAt', dayjs()),
    assoc('expiresAt', dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')),
    assoc('postedAt', undefined),
    assoc('state', 'OPEN'),
    assoc('threadId', undefined)
  )(offer)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await reference.set(offerDataConverter.toFirestore(newOffer))
  // update listings tied to this offer (if any)
  const { receiverItems, senderItems } = offer
  const listings = await getListingsForOffer(senderItems, receiverItems)
  if (!isEmpty(listings)) {
    const offer = await findOfferById(offerId)
    for (const listing of listings) {
      await addOfferToListing(listing.id, offer!)
    }
  }
  return offerId
}
