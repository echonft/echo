import { findNftsForCollectionByTraits } from '@echo/firestore'
import { Nft, NftTraits } from '@echo/model'
import { SwrKey, SwrKeyNames } from '@echo/swr'
import useSWR, { SWRResponse } from 'swr'

interface KeyData {
  collectionSlug: string
  traits?: NftTraits
}

export const useNftsForCollection = (collectionSlug: string, traits?: NftTraits): SWRResponse<Nft[], Error> => {
  const key: SwrKey<KeyData> = {
    name: SwrKeyNames.FIRESTORE_NFTS_FOR_COLLECTION,
    data: { collectionSlug, traits }
  }
  return useSWR(key, ({ data: { collectionSlug } }) => findNftsForCollectionByTraits(collectionSlug, traits), {
    suspense: true
  })

  // TODO useEffect to listen on every NFTs
}
