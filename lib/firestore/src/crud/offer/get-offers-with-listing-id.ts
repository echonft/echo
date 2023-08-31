import { CollectionName } from '../../constants/collection-name'
import { offerDataConverter } from '../../converters/offer-data-converter'
import { firestore } from '../../services/firestore'
import { Offer } from '../../types/model/offer'
import { invoker, map } from 'ramda'

export const getOffersWithListingId = async (listingId: string) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.OFFERS)
    .where('listingsIds', 'array-contains', listingId)
    .withConverter(offerDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Offer[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Offer[]
}
