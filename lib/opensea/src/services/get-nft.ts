import { BASE_URL } from '@echo/opensea/constants/base-url'
import { nextFetchInit } from '@echo/opensea/constants/next-fetch-init'
import { parseNextFetchResponse } from '@echo/opensea/helpers/parse-next-fetch-response'
import type { WithFetchRequest } from '@echo/opensea/types/request/with-fetch-request'
import type { GetNftResponse } from '@echo/opensea/types/response/get-nft-response'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { andThen, pipe, prop } from 'ramda'

interface FetchNftRequest extends WithFetchRequest {
  contract: HexString
  chain: ChainName
  identifier: string
}

export async function getNft(args: FetchNftRequest) {
  const { contract, chain, fetch, identifier } = args
  const response = await fetch(`${BASE_URL}/chain/${chain}/contract/${contract}/nfts/${identifier}`, nextFetchInit)
  return pipe(parseNextFetchResponse<GetNftResponse>, andThen(prop('nft')))(response)
}
