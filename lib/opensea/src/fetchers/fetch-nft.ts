import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { GetNftResponse } from '@echo/opensea/types/response/get-nft-response'
import { isTestnetChain } from '@echo/utils/helpers/is-testnet-chain'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import { andThen, pipe, prop } from 'ramda'

export interface FetchNftRequest extends WithFetch {
  contract: HexString
  chain: ChainName
  identifier: string
}

export async function fetchNft(args: FetchNftRequest) {
  const { contract, chain, fetch, identifier } = args
  const testnet = isTestnetChain(chain)
  const url = `${getBaseUrl(testnet)}/chain/${chain}/contract/${contract}/nfts/${identifier}`
  const response = await throttleFetch({
    fetch,
    url
  })
  if (!response.ok) {
    throw Error(
      `error fetching NFT #${identifier} for contract ${contract} on chain ${chain}: {url: ${url}\nstatus:${response.statusText}}`
    )
  }
  return pipe(parseFetchResponse<GetNftResponse>, andThen(prop('nft')))(response)
}
