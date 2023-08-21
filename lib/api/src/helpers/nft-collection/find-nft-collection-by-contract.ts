import { NftCollection } from '@echo/firestore'
import { both, find, pathEq } from 'ramda'

export const findNftCollectionByContract = (address: string, chainId: number, collections: NftCollection[]) =>
  find(both(pathEq(address, ['contract', 'address']), pathEq(chainId, ['contract', 'chainId'])), collections)
