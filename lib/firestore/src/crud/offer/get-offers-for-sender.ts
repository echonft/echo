import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { firestore } from '../../services/firestore'
import { Offer } from '../../types/model/offer'
import { OfferState } from '../../types/model/offer-state'
import { invoker, isNil, map } from 'ramda'

export const getOffersForSender = async (senderId: string, state?: OfferState) => {
  let query = firestore()
    .collection(CollectionName.OFFERS)
    .where('senderId', '==', senderId)
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
