import type { Contract } from '@echo/model/types/contract'
import { FetchError } from '@echo/opensea/constants/errors/fetch-error'
import { error } from '@echo/opensea/helpers/logger'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import { fetchNftResponseSchema } from '@echo/opensea/validators/fetch-nft-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc } from 'ramda'

export interface FetchNftRequest {
  contract: Contract
  identifier: string
}

export async function fetchNft({ contract, identifier }: FetchNftRequest): Promise<Nullable<PartialNft>> {
  const url = openseaApiPathProvider.nft.fetch.getUrl(assoc('identifier', identifier, contract))
  const response = await throttleFetch(url)
  if (!response.ok) {
    error({ nft: { collection: { contract }, tokenId: identifier }, url }, FetchError.Nft)
    return Promise.reject(Error(FetchError.Nft))
  }
  return parseResponse(fetchNftResponseSchema(contract.chain))(response)
}
