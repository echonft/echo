import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { firestore } from '../../services/firestore'
import { Offer, OfferState } from '@echo/firestore-types'
import { invoker, isNil, map } from 'ramda'

export const getOffersForReceiver = async (receiverId: string, state?: OfferState) => {
  let query = firestore()
    .collection(CollectionName.OFFERS)
    .where('receiverId', '==', receiverId)
    .withConverter(offerDataConverter)

  if (!isNil(state)) {
    query = query.where('state', '==', state)
  }

  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return [] as Offer[]
  }

  return map(invoker(0, 'data'))(querySnapshot.docs) as Offer[]
}
