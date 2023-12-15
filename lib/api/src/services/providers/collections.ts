import { mapQueryConstraintsToQueryParams } from '@echo/api/helpers/request/map-query-constraints-to-query-params'
import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { Collection } from '@echo/model/types/collection'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import axios from 'axios'
import { path } from 'ramda'

export type CollectionProviderResult = Pick<
  Collection,
  'id' | 'profilePictureUrl' | 'name' | 'totalSupply' | 'bannerUrl'
>
export type CollectionProvider = () => Promise<CollectionProviderResult[]>
export function collections(): Promise<CollectionProviderResult[]> {
  const constraints = mapQueryConstraintsToQueryParams({
    select: ['id', 'slug', 'profilePictureUrl', 'name', 'bannerUrl'],
    orderBy: [{ field: 'name', direction: 'asc' }]
  })
  return axios
    .get<{ collections: CollectionProviderResult[] }>(apiUrlProvider.collection.all.getUrl(), {
      params: constraints
    })
    .then(nonNullableReturn(path(['data', 'collections'])))
}
