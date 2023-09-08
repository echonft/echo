import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { firestore } from '../../services/firestore'
import { Listing } from '@echo/firestore-types'
import { invoker, map } from 'ramda'

export async function getListingsWithOfferId(offerId: string) {
  const querySnapshot = await firestore()
    .collection(CollectionName.LISTINGS)
    .where('offersIds', 'array-contains', offerId)
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Listing[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Listing[]
}
