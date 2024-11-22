'use server'
import { getCollectionsSearchData } from '@echo/firestore/crud/collection/get-collections-search-data'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import { collectionToSearchResult } from '@echo/model/mappers/collection/collection-to-search-result'
import type { SearchResult } from '@echo/model/types/search-result'
import { andThen, either, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export async function searchCollections(query: string): Promise<SearchResult[]> {
  await initializeFirestore()
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getCollectionsSearchData,
    andThen(
      pipe(filter(either(propSatisfies(search, 'name'), propSatisfies(search, 'slug'))), map(collectionToSearchResult))
    )
  )()
}
