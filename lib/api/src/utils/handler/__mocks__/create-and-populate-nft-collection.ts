import {
  FirestoreNftCollectionData,
  FirestoreNftCollectionPrototype,
  nftCollectionFirestoreData
} from '@echo/firestore'
import { idThrower } from '@echo/utils'
import { isNil } from 'ramda'

export const createAndPopulateNftCollection = (
  _nftCollectionPrototype: FirestoreNftCollectionPrototype,
  address: string
): Promise<FirestoreNftCollectionData> => {
  const result = nftCollectionFirestoreData[address]
  idThrower(address)
  return isNil(result) ? Promise.reject(new Error('createAndPopulateNftCollection error')) : Promise.resolve(result)
}
