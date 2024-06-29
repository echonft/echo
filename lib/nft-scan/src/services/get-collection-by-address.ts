import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/nft-scan/fetchers/fetch-collection'
import { getLogger } from '@echo/nft-scan/helpers/get-logger'
import { mapCollectionResponse, type MapCollectionResponseArgs } from '@echo/nft-scan/mappers/map-collection-response'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, applySpec, assoc, otherwise, pipe, prop } from 'ramda'

export async function getCollectionByAddress(
  args: WithLoggerType<GetCollectionRequest>
): Promise<Nullable<Collection>> {
  return await pipe(
    assoc('logger', getLogger({ chain: args.contract.chain, fn: getCollectionByAddress.name, logger: args.logger })),
    fetchCollection,
    andThen(
      unlessNil(
        pipe(
          applySpec<MapCollectionResponseArgs>({ chain: always(args.contract.chain), data: prop('data') }),
          mapCollectionResponse
        )
      )
    ),
    otherwise(always(undefined))
  )(args)
}
