import type { Collection } from '@echo/model/types/collection'
import { fetchContract } from '@echo/opensea/fetchers/fetch-contract'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import { mapContractResponseToCollectionRequest } from '@echo/opensea/mappers/map-contract-response-to-collection-request'
import { getCollection } from '@echo/opensea/services/get-collection'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, pipe } from 'ramda'

export async function getCollectionByAddress(
  args: WithLoggerType<GetContractRequest>
): Promise<Omit<Collection, 'swapsCount'>> {
  const logger = getLogger({ chain: args.contract.chain, fn: getCollectionByAddress.name, logger: args.logger })
  return await pipe(
    assoc('logger', logger),
    fetchContract,
    andThen(
      pipe<
        [ContractResponse],
        Omit<GetCollectionRequest, 'fetch'>,
        GetCollectionRequest,
        WithLoggerType<GetCollectionRequest>,
        Promise<Omit<Collection, 'swapsCount'>>
      >(mapContractResponseToCollectionRequest, assoc('fetch', args.fetch), assoc('logger', logger), getCollection)
    )
  )(args)
}
