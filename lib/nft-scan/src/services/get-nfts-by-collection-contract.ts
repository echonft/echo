import type { Address } from '@echo/model/types/address'
import { fetchNftsByContract } from '@echo/nft-scan/fetchers/fetch-nfts-by-contract'
import { error, info } from '@echo/nft-scan/helpers/logger'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchNftsByContractRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-contract-request'
import type { FetchNftsResponse } from '@echo/nft-scan/types/response/fetch-nfts-response'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, concat, isNil, otherwise, pipe } from 'ramda'

async function handlePaging(args: FetchNftsByContractRequest, accNfts: PartialNft[]): Promise<PartialNft[]> {
  const response = await pipe(
    fetchNftsByContract,
    otherwise<FetchNftsResponse, Nullable<FetchNftsResponse>>((err) => {
      error({ err, collection: { contract: args.contract } }, 'could not fetch nfts from NFTScan')
      return undefined
    })
  )(args)
  if (isNil(response)) {
    return accNfts
  }
  const { next, content } = response
  info(
    { collection: { contract: args.contract }, count: content.length, more: !isNilOrEmpty(next) },
    'fetched nfts from NFTScan'
  )
  const mergedResponse = concat(accNfts, content)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export async function getNftsByCollectionContract(contract: Address): Promise<PartialNft[]> {
  info({ collection: { contract } }, 'fetching nfts from NFTScan...')
  const nfts = await handlePaging({ contract }, [])
  info({ collection: { contract }, count: nfts.length }, 'completed fetching nfts from NFTScan')
  return nfts
}
