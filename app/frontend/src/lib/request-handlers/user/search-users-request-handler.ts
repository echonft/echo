import { getUsersSearchData } from '@echo/firestore/crud/user/get-users-search-data'
import { mapUserToSearchResult } from '@echo/firestore/mappers/user/map-user-to-search-result'
import { getSearchParam } from '@echo/frontend/lib/request-handlers/get-search-param'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { RequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { andThen, filter, map, objOf, pipe, propSatisfies, test, toLower } from 'ramda'

export function searchUsersRequestHandler({ req }: RequestHandlerArgs) {
  const query = getSearchParam<string>(req, 'q', true)
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getUsersSearchData,
    andThen(
      pipe(filter(propSatisfies(search, 'username')), map(mapUserToSearchResult), objOf('results'), toNextReponse)
    )
  )()
}
