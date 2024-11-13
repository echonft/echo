import type { Address } from '@echo/model/types/address'
import { FetchError } from '@echo/nft-scan/constants/errors/fetch-error'
import { fetchCollectionsByAccount } from '@echo/nft-scan/fetchers/fetch-collections-by-account'
import { error, info } from '@echo/nft-scan/helpers/logger'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'
import type { FetchCollectionsResponse } from '@echo/nft-scan/types/response/fetch-collections-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, otherwise, pipe } from 'ramda'

export async function getCollectionsByWallet(wallet: Address): Promise<FetchCollectionResponse[]> {
  info({ wallet }, 'fetching collections from NFTScan...')

  const collections = await pipe(
    fetchCollectionsByAccount,
    otherwise<FetchCollectionsResponse, Nullable<FetchCollectionsResponse>>((err) => {
      error({ err, wallet }, FetchError.Collections)
      return undefined
    })
  )({ account: wallet })

  if (isNil(collections)) {
    error({ wallet }, 'Failed to fetch collections from NFTScan')
    return []
  }

  info({ wallet, count: collections.length }, 'completed fetching collections from NFTScan')
  return collections
}
