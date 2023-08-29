import { delayPromise } from '../../utils/delay-promise'
import { findNftCollectionBySlug } from '../../utils/find-nft-collection-by-slug'
import { getAllNfts } from '../model/nft'
import { Nft } from '@echo/ui-model'
import { filter, propEq } from 'ramda'
import useSWR, { SWRResponse } from 'swr'

export const useNftsForCollection = (collectionSlug: string): SWRResponse<Nft[], Error> => {
  const collection = findNftCollectionBySlug(collectionSlug)
  const nfts = getAllNfts()
  return useSWR<Nft[], Error, string>(`useNftsForCollection-${collectionSlug}`, () =>
    delayPromise(Promise.resolve(filter(propEq(collection.id, 'collectionId'))(nfts)))
  )
}
