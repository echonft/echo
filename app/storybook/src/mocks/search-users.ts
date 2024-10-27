import { userToSearchResult } from '@echo/model/mappers/user/user-to-search-result'
import { userMocks } from '@echo/model/mocks/user-mock'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Username } from '@echo/model/types/username'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { filter, map, pathSatisfies, pipe, test, toLower } from 'ramda'

export function searchUsers(query: string): Promise<SearchResult<Username>[]> {
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    filter(pathSatisfies(search, ['discord', 'username'])),
    map(pipe(userToSearchResult, toPromise)),
    promiseAll,
    delayPromise(1000)
  )(userMocks)
}
