import { NftCollection } from '@echo/firestore-types'
import { both, find, pathEq } from 'ramda'

export const getNftCollectionByContract = (address: string, chainId: number, collections: NftCollection[]) =>
  find(both(pathEq(address, ['contract', 'address']), pathEq(chainId, ['contract', 'chainId'])), collections)
