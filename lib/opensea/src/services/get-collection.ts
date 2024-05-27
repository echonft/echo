import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/opensea/fetchers/fetch-collection'
import { mapCollectionResponse } from '@echo/opensea/mappers/map-collection-response'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { andThenOtherwise } from '@echo/utils/fp/and-then-otherwise'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { always, andThen, assoc, isNil, partialRight, pipe } from 'ramda'

async function fetchMainnetCollection(args: GetCollectionRequest) {
  const regex = /^(.+)-\d+$/
  const match = args.slug.match(regex)
  pinoLogger.info(`trying to get mainnet slug for ${args.slug}`)
  if (match) {
    const mainnetSlug = match[1]
    pinoLogger.info(`found potential mainnet slug: ${mainnetSlug}`)
    return pipe<
      [GetCollectionRequest],
      GetCollectionRequest,
      GetCollectionRequest,
      Promise<CollectionResponse>,
      Promise<ReturnType<typeof mapCollectionResponse> | undefined>
    >(
      assoc('slug', mainnetSlug),
      assoc('testnet', false),
      fetchCollection,
      andThenOtherwise(partialRight(mapCollectionResponse, [true]), always(undefined))
    )(args)
  } else {
    return undefined
  }
}

export async function getCollection(args: GetCollectionRequest): Promise<Omit<Collection, 'swapsCount' | 'verified'>> {
  const collection = await pipe(fetchCollection, andThen(mapCollectionResponse))(args)
  if (args.testnet) {
    const mainnetCollection = await fetchMainnetCollection(args)
    if (!isNil(mainnetCollection)) {
      return pipe(assoc('contract', collection.contract), assoc('slug', collection.slug))(mainnetCollection)
    }
    return collection
  }
  return collection
}
