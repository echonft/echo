import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/opensea/fetchers/fetch-collection'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import type { FetchCollectionRequest } from '@echo/opensea/types/request/fetch-collection-request'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, isNil, otherwise, pick, pipe } from 'ramda'

function fetchMainnetCollection(args: WithLoggerType<FetchCollectionRequest>) {
  const logger = getLogger({ chain: args.chain, logger: args.logger })?.child({
    fetcher: fetchMainnetCollection.name,
    request: pick(['slug', 'chain'], args)
  })
  const regex = /^(.+)-\d+$/
  const match = regex.exec(args.slug)
  logger?.info({ slug: args.slug }, 'trying to get mainnet slug')
  if (match) {
    const mainnetSlug = match[1]
    logger?.info({ slug: mainnetSlug }, 'found potential slug')
    return pipe(
      assoc('slug', mainnetSlug),
      fetchCollection,
      otherwise((err) => {
        logger?.error({ err }, 'could not fetch mainnet collection')
        return undefined
      })
    )(assoc('logger', logger, args))
  } else {
    return undefined
  }
}

export async function getCollection(args: WithLoggerType<FetchCollectionRequest>): Promise<Nullable<Collection>> {
  const logger = getLogger({ chain: args.chain, logger: args.logger })?.child({
    fetcher: getCollection.name
  })
  const collection = await pipe(assoc('logger', logger), fetchCollection)(args)
  if (!isNil(collection) && isTestnetChain(args.chain)) {
    // chain does not matter here, but it has to be on mainnet
    const mainnetCollection = await fetchMainnetCollection(assoc('chain', 'blast', args))
    if (!isNil(mainnetCollection)) {
      return pipe(assoc('contract', collection.contract), assoc('slug', collection.slug))(mainnetCollection)
    }
    return collection
  }
  return collection
}
