import { mapCollectionToSearchResult } from '@echo/firestore/mappers/collection/map-collection-to-search-result'
import { getAllCollectionMocks } from '@echo/model/mocks/collection/get-all-collection-mocks'
import type { SearchResult } from '@echo/model/types/search/search-result'
import type { Slug } from '@echo/model/types/slug'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { either, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export function searchCollections(query: string): Promise<SearchResult<Slug>[]> {
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getAllCollectionMocks,
    filter(either(propSatisfies(search, 'name'), propSatisfies(search, 'slug'))),
    map(pipe(mapCollectionToSearchResult, toPromise)),
    delayPromise(promiseAll, 1000)
  )()
}
