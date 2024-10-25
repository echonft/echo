import { fetchNftsByContract } from '@echo/nft-scan/fetchers/fetch-nfts-by-contract'
import { info } from '@echo/nft-scan/helpers/logger'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchNftsByContractRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-contract-request'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { always, assoc, concat, isNil, otherwise, pipe } from 'ramda'

async function handlePaging(args: FetchNftsByContractRequest, accNfts: PartialNft[]): Promise<PartialNft[]> {
  const response = await pipe(fetchNftsByContract, otherwise(always(undefined)))(args)
  if (isNil(response)) {
    return accNfts
  }
  const { next, content } = response
  const mergedResponse = concat(accNfts, content)
  info({ contract: args.contract, request: content.length, total: mergedResponse.length }, 'fetched NFTs')
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export function getNftsByContract(args: Omit<FetchNftsByContractRequest, 'next'>) {
  return handlePaging(args, [])
}
