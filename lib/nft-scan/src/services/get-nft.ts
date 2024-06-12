import type { Nft } from '@echo/model/types/nft'
import { fetchNft } from '@echo/nft-scan/fetchers/fetch-nft'
import { getLogger } from '@echo/nft-scan/helpers/get-logger'
import { mapNftResponse, type MapNftResponseArgs } from '@echo/nft-scan/mappers/map-nft-response'
import type { GetNftRequest } from '@echo/nft-scan/types/request/get-nft-request'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, applySpec, assoc, pipe, prop } from 'ramda'

export async function getNft(
  args: WithLoggerType<GetNftRequest>
): Promise<Omit<Nft, 'collection' | 'owner' | 'updatedAt'> | undefined> {
  const logger = getLogger({ chain: args.contract.chain, fn: 'getNft', logger: args.logger })
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
    )
  )(args)
}
