import { NftCollection } from '@echo/model'
import { allPass, find, pipe, prop, propEq } from 'ramda'

export const getCollectionIdForContract = (collections: NftCollection[], address: string, chainId: number): string =>
  pipe(
    find<NftCollection>(pipe(prop('contract'), allPass([propEq('address', address), propEq('chainId', chainId)]))),
    prop<string>('id')
  )(collections)
