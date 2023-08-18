import { CollectionName } from '../../constants/collection-name'
import { DEFAULT_EXPIRATION_TIME } from '../../constants/default-expiration-time'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { firestore } from '../../services/firestore'
import { OfferItem } from '../../types/model/offer-item'
import { UserDetails } from '../../types/model/user-details'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

interface NewOffer {
  receiver: UserDetails
  receiverItems: OfferItem[]
  sender: UserDetails
  senderItems: OfferItem[]
}

export const addOffer = async (offer: NewOffer): Promise<string> => {
  const reference = firestore().collection(CollectionName.OFFERS).doc()
  const id = reference.id
  const newOffer = pipe(
    assoc('id', id),
    assoc('createdAt', dayjs()),
    assoc('expiresAt', dayjs().add(DEFAULT_EXPIRATION_TIME, 'day')),
    assoc('postedAt', undefined),
    assoc('state', 'OPEN'),
    assoc('threadId', undefined)
  )(offer)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await reference.set(offerDataConverter.toFirestore(newOffer))
  return id
}
