import { BASE_URL } from '@echo/opensea/constants/base-url'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'
import type { GetNftResponse } from '@echo/opensea/types/response/get-nft-response'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { andThen, pipe, prop } from 'ramda'

export interface FetchNftRequest extends WithFetchRequest {
  contract: HexString
  chain: ChainName
  identifier: string
}

export async function fetchNft(args: FetchNftRequest) {
  const { contract, chain, fetch, identifier } = args
  const response = await throttleFetch({
    fetch,
    url: `${BASE_URL}/chain/${chain}/contract/${contract}/nfts/${identifier}`
  })
  if (!response.ok) {
    throw Error(`error fetching NFT #${identifier} for contract ${contract} on chain ${chain}: ${response.statusText}`)
  }
  return pipe(parseFetchResponse<GetNftResponse>, andThen(prop('nft')))(response)
}
