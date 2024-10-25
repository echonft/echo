import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { FetchError } from '@echo/opensea/constants/errors/fetch-error'
import { fetchContract } from '@echo/opensea/fetchers/fetch-contract'
import { error } from '@echo/opensea/helpers/logger'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { FetchCollectionRequest } from '@echo/opensea/types/request/fetch-collection-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import { collectionResponseSchema } from '@echo/opensea/validators/collection-response-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { assoc, isNil, pipe, prop } from 'ramda'

export async function fetchCollection({ chain, slug }: FetchCollectionRequest): Promise<Nullable<Collection>> {
  const url = openseaApiPathProvider.collection.fetch.getUrl({ chain, slug })
  const response = await throttleFetch(url)
  if (!response.ok) {
    error({ chain, slug, url }, FetchError.Collection)
    return Promise.reject(Error(FetchError.Collection))
  }
  const partialCollection = await parseResponse(collectionResponseSchema(chain))(response)
  if (isNil(partialCollection)) {
    return undefined
  }
  const contract = await pipe<[Omit<Collection, 'type'>], Contract, Promise<ContractResponse>>(
    prop('contract'),
    fetchContract
  )(partialCollection)
  return assoc('type', contract.contract_standard, partialCollection)
}
