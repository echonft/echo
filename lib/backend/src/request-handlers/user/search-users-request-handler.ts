import { getSearchParam } from '@echo/backend/request-handlers/get-search-param'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import { getUsersSearchData } from '@echo/firestore/crud/user/get-users-search-data'
import { userToSearchResult } from '@echo/model/mappers/user/user-to-search-result'
import { andThen, filter, map, objOf, pipe, propSatisfies, test, toLower } from 'ramda'

export function searchUsersRequestHandler({ req }: RequestHandlerArgs) {
  const query = getSearchParam<string>(req, 'q', true)
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  return pipe(
    getUsersSearchData,
    andThen(pipe(filter(propSatisfies(search, 'username')), map(userToSearchResult), objOf('results'), toNextReponse))
  )()
}
