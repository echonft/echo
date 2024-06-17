import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { extendedNftResponseIsSuspicious } from '@echo/opensea/helpers/extended-nft-response-is-suspicious'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import { mapExtendedNftResponse } from '@echo/opensea/mappers/map-extended-nft-response'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, ifElse, pipe } from 'ramda'

export function getNft(args: WithLoggerType<FetchNftRequest>): Promise<
  Nullable<
    Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
      collection: Pick<Collection, 'slug'>
    }
  >
> {
  return pipe(
    assoc('logger', getLogger({ chain: args.contract.chain, fn: 'getNft', logger: args.logger })),
    fetchNft,
    andThen(ifElse(extendedNftResponseIsSuspicious, always(undefined), mapExtendedNftResponse))
  )(args)
}
