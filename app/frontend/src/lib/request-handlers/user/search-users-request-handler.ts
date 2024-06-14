import { getUsersSearchData } from '@echo/firestore/crud/user/get-users-search-data'
import { mapUserToSearchResult } from '@echo/firestore/mappers/user/map-user-to-search-result'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getSearchParam } from '@echo/frontend/lib/helpers/get-search-param'
import type { RequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { NextResponse } from 'next/server'
import { andThen, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export async function searchUsersRequestHandler({ req }: RequestHandlerArgs) {
  const query = getSearchParam<string>(req, 'q', true)
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  const results = await guardAsyncFn(
    pipe(getUsersSearchData, andThen(pipe(filter(propSatisfies(search, 'username')), map(mapUserToSearchResult)))),
    ErrorStatus.SERVER_ERROR
  )()
  return NextResponse.json({ results })
}
