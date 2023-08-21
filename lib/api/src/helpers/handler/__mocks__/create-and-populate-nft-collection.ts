import { nftCollectionFirestoreData } from '../../../../test/mocks/nft-collection-firestore-data'
import { FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { idThrower } from '@echo/utils'
import { isNil } from 'ramda'

export const createAndPopulateNftCollection = (
  _nftCollectionPrototype: FirestoreNftCollectionPrototype,
  address: string
): Promise<FirestoreNftCollectionData> => {
  const result = nftCollectionFirestoreData[address]
  idThrower(address)
  if (isNil(result)) {
    return Promise.reject('createAndPopulateNftCollection error')
  }
  return Promise.resolve(result)
}
