import { fetchNft } from '@echo/nft-scan/fetchers/fetch-nft'
import { getLogger } from '@echo/nft-scan/helpers/get-logger'
import { mapNftResponse, type MapNftResponseArgs } from '@echo/nft-scan/mappers/map-nft-response'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { GetNftRequest } from '@echo/nft-scan/types/request/get-nft-request'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, applySpec, assoc, otherwise, pipe, prop } from 'ramda'

export async function getNft(args: WithLoggerType<GetNftRequest>): Promise<Nullable<PartialNft>> {
  const logger = getLogger({ chain: args.contract.chain, logger: args.logger })?.child({
    fetcher: getNft.name
  })
  return await pipe(
    assoc('logger', logger),
    fetchNft,
    andThen(
      pipe(
        applySpec<MapNftResponseArgs>({
          chain: always(args.contract.chain),
          response: prop('data'),
          logger: always(logger)
        }),
        mapNftResponse
      )
    ),
    otherwise(always(undefined))
  )(args)
}
