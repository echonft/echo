import { CollectionName } from '../../constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '../../constants/default-expiration-time'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { assertOfferItems } from '../../helpers/offer/assert-offer-items'
import { firestore } from '../../services/firestore'
import { OfferItem } from '../../types/model/offer-item'
import { UserDetails } from '../../types/model/user-details'
import { addOfferToListing } from '../listing/add-offer-to-listing'
import { getListingsForOffer } from '../listing/get-listings-for-offer'
import { NonEmptyArray } from '@echo/utils'
import dayjs from 'dayjs'
import { assoc, isEmpty, map, pipe, prop } from 'ramda'

interface NewOffer {
  receiver: UserDetails
  receiverItems: NonEmptyArray<OfferItem>
  sender: UserDetails
  senderItems: NonEmptyArray<OfferItem>
}

export async function addOffer(offer: NewOffer): Promise<string> {
  const { receiverItems, senderItems } = offer
  const listings = await getListingsForOffer(senderItems, receiverItems)
  const reference = firestore().collection(CollectionName.OFFERS).doc()
  assertOfferItems(receiverItems)
  assertOfferItems(senderItems)
  const offerId = reference.id
  const newOffer = pipe(
    assoc('id', offerId),
    assoc('createdAt', dayjs()),
    assoc('discordGuild', undefined),
    assoc('expiresAt', dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')),
    assoc('listingsIds', map(prop('id'), listings)),
    assoc('state', 'OPEN')
  )(offer)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await reference.set(offerDataConverter.toFirestore(newOffer))
  // update listings tied to this offer (if any)
  if (!isEmpty(listings)) {
    for (const listing of listings) {
      await addOfferToListing(listing, offerId)
    }
  }
  return offerId
}
