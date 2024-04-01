import { mapUserToSearchResult } from '@echo/firestore/mappers/map-user-to-search-result'
import { getAllUserDocumentDataMocks } from '@echo/firestore-mocks/user/get-all-user-document-data-mocks'
import type { SearchResult } from '@echo/model/types/search-result'
import { filter, map, pathSatisfies, pipe, test, toLower } from 'ramda'

export function searchUsers(query: string): SearchResult<string>[] {
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getAllUserDocumentDataMocks,
    filter(pathSatisfies(search, ['discord', 'username'])),
    map(mapUserToSearchResult)
  )()
}
