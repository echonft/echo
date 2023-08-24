import { delayPromise } from '../../utils/delay-promise'
import { findNftsForCollectionByTraits } from '../../utils/find-nfts-for-collection-by-traits'
import { Nft, NftTraits } from '@echo/ui-model'
import useSWR, { SWRResponse } from 'swr'

interface Key {
  collectionSlug: string
  traits?: NftTraits
}
export const useNftsForCollection = (collectionSlug: string, traits?: NftTraits): SWRResponse<Nft[], Error> =>
  useSWR<Nft[], Error, Key>({ collectionSlug, traits }, () =>
    delayPromise(Promise.resolve(findNftsForCollectionByTraits(collectionSlug, traits)))
  )
