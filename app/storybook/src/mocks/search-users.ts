import { userToSearchResult } from '@echo/model/mappers/user/user-to-search-result'
import { userMocks } from '@echo/model/mocks/user-mock'
import type { SearchResult } from '@echo/model/types/search-result'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { rangeDelay } from 'delay'
import { filter, map, pathSatisfies, pipe, test, toLower } from 'ramda'

export async function searchUsers(query: string): Promise<SearchResult[]> {
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  const value = await pipe(
    filter(pathSatisfies(search, ['discord', 'username'])),
    map(pipe(userToSearchResult, toPromise)),
    promiseAll
  )(userMocks)
  return rangeDelay(800, 1600, { value })
}
