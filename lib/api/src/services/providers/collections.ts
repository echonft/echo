import { apiUrlProvider } from '@echo/api/services/routing/api-url-provider'
import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import axios from 'axios'
import { path } from 'ramda'

export function collections(): Promise<CollectionProviderResult[]> {
  return axios
    .get<{ collections: CollectionProviderResult[] }>(apiUrlProvider.collection.all.getUrl())
    .then(nonNullableReturn(path(['data', 'collections'])))
}
