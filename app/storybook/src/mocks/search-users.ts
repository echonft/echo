import { mapUserToSearchResult } from '@echo/firestore/mappers/user/map-user-to-search-result'
import { getAllUserDocumentDataMocks } from '@echo/firestore/mocks/user/get-all-user-document-data-mocks'
import type { SearchResult } from '@echo/model/types/search/search-result'
import type { Username } from '@echo/model/types/username'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { filter, map, pathSatisfies, pipe, test, toLower } from 'ramda'

export function searchUsers(query: string): Promise<SearchResult<Username>[]> {
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getAllUserDocumentDataMocks,
    filter(pathSatisfies(search, ['discord', 'username'])),
    map(pipe(mapUserToSearchResult, toPromise)),
    delayPromise(promiseAll, 1000)
  )()
}
