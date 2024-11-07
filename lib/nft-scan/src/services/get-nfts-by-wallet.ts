import type { Address } from '@echo/model/types/address'
import { fetchNftsByAccount } from '@echo/nft-scan/fetchers/fetch-nfts-by-account'
import { error, info } from '@echo/nft-scan/helpers/logger'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { FetchNftsByAccountRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-account-request'
import type { FetchNftsResponse } from '@echo/nft-scan/types/response/fetch-nfts-response'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, concat, isNil, otherwise, pipe } from 'ramda'

async function handlePaging(args: FetchNftsByAccountRequest, accNfts: PartialNft[]): Promise<PartialNft[]> {
  const response = await pipe(
    fetchNftsByAccount,
    otherwise<FetchNftsResponse, Nullable<FetchNftsResponse>>((err) => {
      error({ err, wallet: args.account }, 'could not fetch nfts from NFTScan')
      return undefined as Nullable<FetchNftsResponse>
    })
  )(args)
  if (isNil(response)) {
    return accNfts
  }
  const { next, content } = response
  info({ wallet: args.account, count: content.length, more: !isNilOrEmpty(next) }, 'fetched nfts from NFTScan')
  const mergedResponse = concat(accNfts, content)
  if (isNilOrEmpty(next)) {
    return mergedResponse
  }
  return handlePaging(assoc('next', next, args), mergedResponse)
}

export async function getNftsByWallet(wallet: Address): Promise<PartialNft[]> {
  info({ wallet }, 'fetching nfts from NFTScan...')
  const nfts = await handlePaging({ account: wallet }, [])
  info({ wallet, count: nfts.length }, 'complted fetching nfts from NFTScan')
  return nfts
}
