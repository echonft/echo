import type { Wallet } from '@echo/model/types/wallet'
import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { getNftResponseSchema } from '@echo/opensea/validators/get-nft-response-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'

export interface FetchNftRequest extends WithFetch {
  contract: Wallet
  identifier: string
}

export async function fetchNft(args: WithLoggerType<FetchNftRequest>): Promise<Nullable<PartialNft>> {
  const { contract, fetch, identifier, logger } = args
  const url = `${getBaseUrl(contract.chain)}/chain/${contract.chain}/contract/${contract.address}/nfts/${identifier}`
  const response = await throttleFetch({
    fetch,
    url,
    logger
  })
  if (!response.ok) {
    logger?.error(
      { fn: 'fetchNft', nft: { collection: { contract }, tokenId: identifier }, url },
      'error fetching collection'
    )
    return Promise.reject(
      Error(
        `error fetching NFT #${identifier} for contract ${JSON.stringify(
          contract
        )}: {url: ${url}\nstatus:${response.statusText}}`
      )
    )
  }
  return parseResponse(getNftResponseSchema(contract.chain))(response)
}
