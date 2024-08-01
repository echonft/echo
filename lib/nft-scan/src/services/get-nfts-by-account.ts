import { fetchNftsByAccount } from '@echo/nft-scan/fetchers/fetch-nfts-by-account'
import { getLogger } from '@echo/nft-scan/helpers/get-logger'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchNftsByAccountRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-account-request'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { always, assoc, concat, isNil, otherwise, partialRight, pipe } from 'ramda'

async function handlePaging(args: FetchNftsByAccountRequest, accNfts: PartialNft[]): Promise<PartialNft[]> {
  const response = await pipe(fetchNftsByAccount, otherwise(always(undefined)))(args)
  if (isNil(response)) {
    return accNfts
  }
  const { next, content } = response
  const mergedResponse = concat(accNfts, content)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export function getNftsByAccount(args: Omit<FetchNftsByAccountRequest, 'next'>) {
  const logger = getLogger({ chain: args.wallet.chain, logger: args.logger })?.child({
    fetcher: getNftsByAccount.name
  })
  return pipe<[Omit<FetchNftsByAccountRequest, 'next'>], FetchNftsByAccountRequest, Promise<PartialNft[]>>(
    assoc('logger', logger),
    partialRight(handlePaging, [[]])
  )(args)
}
