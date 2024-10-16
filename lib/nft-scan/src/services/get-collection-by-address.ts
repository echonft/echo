import type { Collection } from '@echo/model/types/collection/collection'
import { fetchCollection } from '@echo/nft-scan/fetchers/fetch-collection'
import { getLogger } from '@echo/nft-scan/helpers/get-logger'
import type { FetchCollectionRequest } from '@echo/nft-scan/types/request/fetch-collection-request'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, pipe } from 'ramda'

export async function getCollectionByAddress(
  args: WithLoggerType<FetchCollectionRequest>
): Promise<Nullable<Collection>> {
  const logger = getLogger({ chain: args.contract.chain, logger: args.logger })?.child({
    fetcher: getCollectionByAddress.name
  })
  return await pipe(assoc('logger', logger), fetchCollection)(args)
}
