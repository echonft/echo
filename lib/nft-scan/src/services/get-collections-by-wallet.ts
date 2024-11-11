import type { Address } from '@echo/model/types/address'
import { FetchError } from '@echo/nft-scan/constants/errors/fetch-error'
import { fetchCollectionsByAccount } from '@echo/nft-scan/fetchers/fetch-collections-by-account'
import { error, info } from '@echo/nft-scan/helpers/logger'
import type { FetchCollectionsByAccountRequest } from '@echo/nft-scan/types/request/fetch-collections-by-account-request'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'
import type { FetchCollectionsResponse } from '@echo/nft-scan/types/response/fetch-collections-response'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, concat, isNil, otherwise, pipe } from 'ramda'

async function handlePaging(
  args: FetchCollectionsByAccountRequest,
  accNfts: FetchCollectionResponse[]
): Promise<FetchCollectionResponse[]> {
  const response = await pipe(
    fetchCollectionsByAccount,
    otherwise<FetchCollectionsResponse, Nullable<FetchCollectionsResponse>>((err) => {
      error({ err, wallet: args.account }, FetchError.Collections)
      return undefined as Nullable<FetchCollectionsResponse>
    })
  )(args)
  if (isNil(response)) {
    return accNfts
  }
  const { next, content } = response
  info({ wallet: args.account, count: content.length, more: !isNilOrEmpty(next) }, 'fetched collectibns from NFTScan')
  const mergedResponse = concat(accNfts, content)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export async function getCollectionsByWallet(wallet: Address): Promise<FetchCollectionResponse[]> {
  info({ wallet }, 'fetching collections from NFTScan...')
  const collections = await handlePaging({ account: wallet }, [])
  info({ wallet, count: collections.length }, 'complted fetching collections from NFTScan')
  return collections
}
