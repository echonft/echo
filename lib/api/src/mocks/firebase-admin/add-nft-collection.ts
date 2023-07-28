import {
  FirestoreNftCollectionData,
  FirestoreNftCollectionPrototype,
  nftCollectionFirestoreData
} from '@echo/firestore'
import { R } from '@mobily/ts-belt'

export const mockAddNftCollection = (
  _nftCollectionPrototype: FirestoreNftCollectionPrototype
): Promise<R.Result<FirestoreNftCollectionData, Error>> => {
  return Promise.resolve(R.fromNullable(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13'], new Error('invalid data')))
}
