import type { Address } from '@echo/model/types/address'
import { fetchNftsByContract } from '@echo/nft-scan/fetchers/fetch-nfts-by-contract'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchNftsByContractRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-contract-request'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { always, assoc, concat, isNil, otherwise, pipe } from 'ramda'

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

export function getNftsByCollectionContract(contract: Address) {
  return handlePaging({ contract }, [])
}
