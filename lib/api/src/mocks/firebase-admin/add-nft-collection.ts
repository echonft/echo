import {
  FirestoreNftCollectionData,
  FirestoreNftCollectionPrototype,
  nftCollectionFirestoreData
} from '@echo/firestore'

export const mockAddNftCollection = (
  _nftCollectionPrototype: FirestoreNftCollectionPrototype
): Promise<FirestoreNftCollectionData> => {
  return Promise.resolve(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!)
}
