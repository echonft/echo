import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { firestore } from '../../services/firestore'
import { Offer } from '@echo/firestore-types'
import { invoker, map } from 'ramda'

export const getAllOffers = async () => {
  const querySnapshot = await firestore().collection(CollectionName.OFFERS).withConverter(offerDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as Offer[]
}
