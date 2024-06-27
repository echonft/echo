import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { extendedNftResponseIsSuspicious } from '@echo/opensea/helpers/extended-nft-response-is-suspicious'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import { mapExtendedNftResponse } from '@echo/opensea/mappers/map-extended-nft-response'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, ifElse, objOf, otherwise, pipe } from 'ramda'

type PartialNft = Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
  collection: Pick<Collection, 'slug'>
}
export function getNft(args: WithLoggerType<FetchNftRequest>): Promise<Nullable<PartialNft>> {
  const logger = getLogger({ chain: args.contract.chain, fn: 'getNft', logger: args.logger })
  return pipe(
    assoc('logger', logger),
    fetchNft,
    andThen(
      ifElse(
        extendedNftResponseIsSuspicious,
        always(undefined),
        pipe(objOf('response'), assoc('chain', args.contract.chain), assoc('logger', logger), mapExtendedNftResponse)
      )
    ),
    otherwise(always(undefined))
  )(args)
}
