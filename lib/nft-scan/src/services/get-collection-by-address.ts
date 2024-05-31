import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/nft-scan/fetchers/fetch-collection'
import { mapCollectionResponse } from '@echo/nft-scan/mappers/map-collection-response'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import { andThen, partialRight, pipe } from 'ramda'

export async function getCollectionByAddress(args: GetCollectionRequest): Promise<Omit<Collection, 'swapsCount'>> {
  return await pipe(fetchCollection, andThen(partialRight(mapCollectionResponse, [args.chain])))(args)
}
