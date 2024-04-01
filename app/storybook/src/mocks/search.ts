import type { SearchResult } from '@echo/model/types/search-result'
import { searchCollections } from '@echo/storybook/mocks/search-collections'
import { searchUsers } from '@echo/storybook/mocks/search-users'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { concat, converge, identity, map, pipe } from 'ramda'

export function search(query: string) {
  return pipe<
    [string],
    SearchResult<string>[],
    Promise<SearchResult<string>>[],
    Promise<SearchResult<string>[]>,
    Promise<SearchResult<string>[]>
  >(
    converge<
      SearchResult<string>[],
      [(query: string) => SearchResult<string>[], (query: string) => SearchResult<string>[]]
    >(concat, [searchCollections, searchUsers]),
    map(toPromise),
    promiseAll,
    delayPromise(identity, 1000)
  )(query)
}
