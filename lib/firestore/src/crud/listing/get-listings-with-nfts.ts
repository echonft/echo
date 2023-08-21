import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { Listing } from '../../types/model/listing'
import { firestore } from 'firebase-admin'
import { invoker, map } from 'ramda'

export const getListingsWithNfts = async (nftIds: string[]) => {
  const querySnapshot = await firestore()
    .collection(CollectionName.LISTINGS)
    .where('itemsIds', 'array-contains-any', nftIds)
    .withConverter(listingDataConverter)
    .get()

  if (querySnapshot.empty) {
    return [] as Listing[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Listing[]
}
