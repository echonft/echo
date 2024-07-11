import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/opensea/fetchers/fetch-collection'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import { collectionResponseSchema } from '@echo/opensea/validators/collection-response-schema'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, otherwise, pick, pipe } from 'ramda'

async function fetchMainnetCollection(args: WithLoggerType<GetCollectionRequest>) {
  const logger = getLogger({ chain: args.chain, logger: args.logger })?.child({
    fetcher: fetchMainnetCollection.name
  })
  const regex = /^(.+)-\d+$/
  const match = args.slug.match(regex)
  logger?.info({ slug: args.slug }, 'trying to get mainnet slug')
  if (match) {
    const mainnetSlug = match[1]
    logger?.info({ slug: mainnetSlug }, 'found potential slug')
    return pipe(
      assoc('slug', mainnetSlug),
      fetchCollection,
      andThen((response) => collectionResponseSchema({ logger }).parse(response)),
      otherwise((err) => {
        logger?.error({ err, request: pick(['slug', 'chain'], args) }, 'could not fetch collection')
        return undefined
      })
    )(assoc('logger', logger, args))
  } else {
    return undefined
  }
}

export async function getCollection(args: WithLoggerType<GetCollectionRequest>): Promise<Nullable<Collection>> {
  const logger = getLogger({ chain: args.chain, logger: args.logger })?.child({
    fetcher: getCollection.name
  })
  const collection = await pipe(
    assoc('logger', logger),
    fetchCollection,
    andThen((response) => collectionResponseSchema(pick(['chain', 'logger'], args)).parse(response)),
    otherwise((err) => {
      logger?.error({ err, request: pick(['slug', 'chain'], args) }, 'could not fetch collection')
      return undefined
    })
  )(args)
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
