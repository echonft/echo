import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { firestore } from '../../services/firestore'
import { Listing } from '@echo/firestore-types'
import { invoker, map } from 'ramda'

export const getAllListings = async () => {
  const querySnapshot = await firestore().collection(CollectionName.LISTINGS).withConverter(listingDataConverter).get()
  return map(invoker(0, 'data'), querySnapshot.docs) as Listing[]
}
