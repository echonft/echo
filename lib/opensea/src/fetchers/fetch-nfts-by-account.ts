import { BASE_URL } from '@echo/opensea/constants/base-url'
import { nextFetchInit } from '@echo/opensea/constants/next-fetch-init'
import { getChainName } from '@echo/opensea/helpers/get-chain-name'
import { parseNextFetchResponse } from '@echo/opensea/helpers/parse-next-fetch-response'
import type { PagingRequest } from '@echo/opensea/types/paging/paging-request'
import type { GetNftsByAccountResponse } from '@echo/opensea/types/response/get-nfts-by-account-response'
import type { WithFetch } from '@echo/opensea/types/with-fetch'
import type { HexString } from '@echo/utils/types/hex-string'
import { stringify } from 'qs'
import { concat, pick } from 'ramda'

export interface FetchNftsByAccountArgs extends PagingRequest, WithFetch {
  address: HexString
  chainId: number
}

export async function fetchNftsByAccount(args: FetchNftsByAccountArgs) {
  const { address, chainId, fetch } = args
  const chain = getChainName(chainId)
  const url = concat(
    `${BASE_URL}/chain/${chain}/account/${address}/nfts`,
    stringify(pick(['limit', 'next'], args), { addQueryPrefix: true, skipNulls: true })
  )
  const response = await fetch(url, nextFetchInit)
  return parseNextFetchResponse<GetNftsByAccountResponse>(response)
}
