import { CollectionName, findNftCollectionById, subscribeToDocument } from '@echo/firestore'
import { NftCollection } from '@echo/model'
import { SwrKey, SwrKeyNames } from '@echo/swr'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'
import { useEffect } from 'react'
import useSWR from 'swr'

interface KeyData {
  collectionId: string
}

export const useNftCollection = (collectionId: string) => {
  const key: SwrKey<KeyData> = {
    name: SwrKeyNames.FIRESTORE_NFT_COLLECTION,
    data: { collectionId }
  }
  const response = useSWR(key, ({ data: { collectionId } }) => findNftCollectionById(collectionId), {
    suspense: true
  })

  useEffect(() => {
    if (!isNil(response)) {
      return subscribeToDocument<NftCollection>(
        (nftCollection) => {
          void response.mutate(R.fromPromise(nftCollection))
        },
        CollectionName.NFT_COLLECTIONS,
        collectionId
      )
    }
    return
  }, [collectionId, response])
}
