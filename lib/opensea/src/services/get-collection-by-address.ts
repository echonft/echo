import type { Collection } from '@echo/model/types/collection'
import { fetchContract } from '@echo/opensea/fetchers/fetch-contract'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import { mapContractResponseToCollectionRequest } from '@echo/opensea/mappers/map-contract-response-to-collection-request'
import { getCollection } from '@echo/opensea/services/get-collection'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, otherwise, pipe } from 'ramda'

export async function getCollectionByAddress(args: WithLoggerType<GetContractRequest>): Promise<Nullable<Collection>> {
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
        Promise<Nullable<Collection>>
      >(mapContractResponseToCollectionRequest, assoc('fetch', args.fetch), assoc('logger', logger), getCollection)
    ),
    otherwise((err) => {
      logger?.error({ err, contract: args.contract }, 'could not fetch contract')
      return undefined
    })
  )(args)
}
