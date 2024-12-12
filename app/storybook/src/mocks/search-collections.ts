import { collectionToSearchResult } from '@echo/model/mappers/collection/collection-to-search-result'
import { collectionMocks } from '@echo/model/mocks/collection-mock'
import type { SearchResult } from '@echo/model/types/search-result'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { rangeDelay } from 'delay'
import { either, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export async function searchCollections(query: string): Promise<SearchResult[]> {
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  const value = await pipe(
    filter(either(propSatisfies(search, 'name'), propSatisfies(search, 'slug'))),
    map(pipe(collectionToSearchResult, toPromise)),
    promiseAll
  )(collectionMocks)
  return rangeDelay(800, 1600, { value })
}
