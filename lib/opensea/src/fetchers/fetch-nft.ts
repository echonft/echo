import type { Wallet } from '@echo/model/types/wallet'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { fetchNftResponseSchema } from '@echo/opensea/validators/fetch-nft-response-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { assoc } from 'ramda'

export interface FetchNftRequest extends WithFetch {
  contract: Wallet
  identifier: string
}

export async function fetchNft(args: WithLoggerType<FetchNftRequest>): Promise<Nullable<PartialNft>> {
  const { contract, fetch, identifier } = args
  const url = openseaApiPathProvider.nft.fetch.getUrl(assoc('identifier', identifier, contract))
  const logger = args.logger?.child({ url, fetcher: fetchNft.name })
  const response = await throttleFetch({
    fetch,
    url,
    logger
  })
  if (!response.ok) {
    logger?.error({ nft: { collection: { contract }, tokenId: identifier } }, 'error fetching NFT')
    return Promise.reject(Error('error fetching NFT for contract'))
  }
  return parseResponse(fetchNftResponseSchema(contract.chain))(response)
}
