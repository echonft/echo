import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/nft-scan/fetchers/fetch-collection'
import { mapCollectionResponse, type MapCollectionResponseArgs } from '@echo/nft-scan/mappers/map-collection-response'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import { always, andThen, applySpec, pipe, prop } from 'ramda'

export async function getCollectionByAddress(args: GetCollectionRequest): Promise<Omit<Collection, 'swapsCount'>> {
  return await pipe(
    fetchCollection,
    andThen(
      pipe(
        applySpec<MapCollectionResponseArgs>({ chain: always(args.contract.chain), data: prop('data') }),
        mapCollectionResponse
      )
    )
  )(args)
}
