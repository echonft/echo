'use server'
import { getCollectionsSearchData } from '@echo/firestore/crud/collection/get-collections-search-data'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { collectionToSearchResult } from '@echo/model/mappers/collection/collection-to-search-result'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Slug } from '@echo/model/types/slug'
import { andThen, either, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export async function searchCollections(query: string): Promise<SearchResult<Slug>[]> {
  await initializeFirebase()
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getCollectionsSearchData,
    andThen(
      pipe(filter(either(propSatisfies(search, 'name'), propSatisfies(search, 'slug'))), map(collectionToSearchResult))
    )
  )()
}
