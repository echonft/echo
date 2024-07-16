import type { Collection } from '@echo/model/types/collection'
import { fetchContract } from '@echo/opensea/fetchers/fetch-contract'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import { getCollection } from '@echo/opensea/services/get-collection'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, applySpec, assoc, pipe, prop } from 'ramda'

export async function getCollectionByAddress(args: WithLoggerType<GetContractRequest>): Promise<Nullable<Collection>> {
  const logger = getLogger({ chain: args.contract.chain, logger: args.logger })?.child({
    fetcher: getCollectionByAddress.name
  })
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
      >(
        applySpec<GetCollectionRequest>({ slug: prop('collection'), chain: prop('chain') }),
        assoc('fetch', args.fetch),
        assoc('logger', logger),
        getCollection
      )
    )
  )(args)
}
