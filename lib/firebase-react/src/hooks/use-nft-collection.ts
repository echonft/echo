import { CollectionName, findNftCollectionBySlug, subscribeToDocument } from '@echo/firestore'
import { NftCollection } from '@echo/model'
import { SwrKey, SwrKeyNames } from '@echo/swr'
import { isNil } from 'ramda'
import { useEffect } from 'react'
import useSWR, { SWRResponse } from 'swr'

interface KeyData {
  slug: string
}

export const useNftCollection = (slug: string): SWRResponse<NftCollection, Error> => {
  const key: SwrKey<KeyData> = {
    name: SwrKeyNames.FIRESTORE_NFT_COLLECTION,
    data: { slug }
  }
  const response = useSWR<NftCollection, Error, SwrKey<KeyData>>(
    key,
    ({ data: { slug } }) => findNftCollectionBySlug(slug),
    {
      suspense: true
    }
  )

  useEffect(() => {
    if (!isNil(response) && !isNil(response.data)) {
      return subscribeToDocument<NftCollection>(
        (nftCollection) => {
          void response.mutate(nftCollection)
        },
        CollectionName.NFT_COLLECTIONS,
        response.data.id
      )
    }
    return
  }, [response])

  return response
}
