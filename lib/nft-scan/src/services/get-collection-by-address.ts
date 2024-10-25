import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/nft-scan/fetchers/fetch-collection'
import type { FetchCollectionRequest } from '@echo/nft-scan/types/request/fetch-collection-request'
import type { Nullable } from '@echo/utils/types/nullable'

export function getCollectionByAddress(args: FetchCollectionRequest): Promise<Nullable<Collection>> {
  return fetchCollection(args)
}
