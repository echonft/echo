import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/opensea/fetchers/fetch-collection'
import { getLogger } from '@echo/opensea/helpers/get-logger'
import { mapCollectionResponse } from '@echo/opensea/mappers/map-collection-response'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { andThenOtherwise } from '@echo/utils/fp/and-then-otherwise'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, isNil, partialRight, pipe } from 'ramda'

async function fetchMainnetCollection(args: WithLoggerType<GetCollectionRequest>) {
  const { logger } = args
  const regex = /^(.+)-\d+$/
  const match = args.slug.match(regex)
  logger?.info({ slug: args.slug }, 'trying to get mainnet slug')
  if (match) {
    const mainnetSlug = match[1]
    logger?.info({ slug: mainnetSlug }, 'found potential slug')
    return pipe<
      [WithLoggerType<GetCollectionRequest>],
      WithLoggerType<GetCollectionRequest>,
      Promise<CollectionResponse>,
      Promise<ReturnType<typeof mapCollectionResponse> | undefined>
    >(
      assoc('slug', mainnetSlug),
      fetchCollection,
      andThenOtherwise(partialRight(mapCollectionResponse, [true]), always(undefined))
    )(args)
  } else {
    return undefined
  }
}

export async function getCollection(
  args: WithLoggerType<GetCollectionRequest>
): Promise<Omit<Collection, 'swapsCount'>> {
  const collection = await pipe(
    assoc('logger', getLogger({ chain: args.chain, fn: 'getCollection', logger: args.logger })),
    fetchCollection,
    andThen(mapCollectionResponse)
  )(args)
  if (isTestnetChain(args.chain)) {
    // chain does not matter here, but it has to be on mainnet
    const mainnetCollection = await fetchMainnetCollection(assoc('chain', 'blast', args))
    if (!isNil(mainnetCollection)) {
      return pipe(assoc('contract', collection.contract), assoc('slug', collection.slug))(mainnetCollection)
    }
    return collection
  }
  return collection
}
