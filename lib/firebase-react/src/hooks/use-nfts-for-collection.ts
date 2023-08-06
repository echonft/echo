import { findNftsForCollectionByTraits } from '@echo/firestore'
import { NftTraits } from '@echo/model'
import { SwrKey, SwrKeyNames } from '@echo/swr'
import useSWR from 'swr'

interface KeyData {
  collectionId: string
  traits?: NftTraits
}

export const useNftsForCollection = (collectionId: string, traits?: NftTraits) => {
  const key: SwrKey<KeyData> = {
    name: SwrKeyNames.FIRESTORE_NFTS_FOR_COLLECTION,
    data: { collectionId, traits }
  }
  return useSWR(key, ({ data: { collectionId } }) => findNftsForCollectionByTraits(collectionId, traits), {
    suspense: true
  })

  // TODO useEffect to listen on every NFTs
}
