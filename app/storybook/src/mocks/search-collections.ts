import { mapCollectionToSearchResult } from '@echo/firestore/mappers/map-collection-to-search-result'
import type { SearchResult } from '@echo/model/types/search-result'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { either, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export function searchCollections(query: string): SearchResult<string>[] {
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getAllCollectionMocks,
    filter(either(propSatisfies(search, 'name'), propSatisfies(search, 'slug'))),
    map(mapCollectionToSearchResult)
  )()
}
