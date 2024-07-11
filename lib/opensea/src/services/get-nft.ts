import { fetchNft, type FetchNftRequest } from '@echo/opensea/fetchers/fetch-nft'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import type { PartialNft } from '@echo/opensea/types/partial-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, pipe } from 'ramda'

export function getNft(args: WithLoggerType<FetchNftRequest>): Promise<Nullable<PartialNft>> {
  const logger = getLogger({ chain: args.contract.chain, logger: args.logger })?.child({
    fetcher: getNft.name
  })
  return pipe(assoc('logger', logger), fetchNft)(args)
}
