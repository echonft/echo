import type { Collection } from '@echo/model/types/collection'
import { fetchContract } from '@echo/opensea/fetchers/fetch-contract'
import { mapContractResponseToCollectionRequest } from '@echo/opensea/mappers/map-contract-response-to-collection-request'
import { getCollection } from '@echo/opensea/services/get-collection'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import { andThen, assoc, pipe } from 'ramda'

export async function getCollectionByAddress(
  args: GetContractRequest
): Promise<Omit<Collection, 'swapsCount' | 'verified'>> {
  return await pipe(
    fetchContract,
    andThen(
      pipe<
        [ContractResponse],
        Omit<GetCollectionRequest, 'fetch'>,
        GetCollectionRequest,
        Promise<Omit<Collection, 'swapsCount' | 'verified'>>
      >(mapContractResponseToCollectionRequest, assoc('fetch', args.fetch), getCollection)
    )
  )(args)
}
