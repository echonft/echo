import { nftCollectionFirestoreData } from '../nft-collection-firestore-data'
import { FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'

export const mockAddNftCollection = (
  _nftCollectionPrototype: FirestoreNftCollectionPrototype
): Promise<FirestoreNftCollectionData> => {
  return Promise.resolve(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!)
}
