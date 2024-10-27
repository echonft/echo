import { searchCollections } from '@echo/storybook/mocks/search-collections'
import { searchUsers } from '@echo/storybook/mocks/search-users'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { andThen, flatten, juxt, pipe } from 'ramda'

export function search(query: string) {
  return pipe(juxt([searchCollections, searchUsers]), promiseAll, andThen(flatten))(query)
}
