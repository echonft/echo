import { fetchNftsByContract } from '@echo/nft-scan/fetchers/fetch-nfts-by-contract'
import { getLogger } from '@echo/nft-scan/helpers/get-logger'
import { getNftsByAccount } from '@echo/nft-scan/services/get-nfts-by-account'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchNftsByContractRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-contract-request'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { always, assoc, concat, isNil, otherwise, partialRight, pipe } from 'ramda'

async function handlePaging(args: FetchNftsByContractRequest, accNfts: PartialNft[]): Promise<PartialNft[]> {
  const response = await pipe(fetchNftsByContract, otherwise(always(undefined)))(args)
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

export function getNftsByContract(args: Omit<FetchNftsByContractRequest, 'next'>) {
  const logger = getLogger({ chain: args.contract.chain, logger: args.logger })?.child({
    fetcher: getNftsByAccount.name
  })
  return pipe<[Omit<FetchNftsByContractRequest, 'next'>], FetchNftsByContractRequest, Promise<PartialNft[]>>(
    assoc('logger', logger),
    partialRight(handlePaging, [[]])
  )(args)
}
