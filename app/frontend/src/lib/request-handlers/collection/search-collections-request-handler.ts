import type { ApiRequest } from '@echo/api/types/api-request'
import { getCollectionsSearchData } from '@echo/firestore/crud/collection/get-collections-search-data'
import { mapCollectionToSearchResult } from '@echo/firestore/mappers/collection/map-collection-to-search-result'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getSearchParam } from '@echo/frontend/lib/helpers/get-search-param'
import { NextResponse } from 'next/server'
import { andThen, either, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export async function searchCollectionsRequestHandler(req: ApiRequest<never>) {
  const query = getSearchParam<string>(req, 'q', true)
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  const results = await guardAsyncFn(
    pipe(
      getCollectionsSearchData,
      andThen(
        pipe(
          filter(either(propSatisfies(search, 'name'), propSatisfies(search, 'slug'))),
          map(mapCollectionToSearchResult)
        )
      )
    ),
    ErrorStatus.SERVER_ERROR
  )()
  return NextResponse.json({ results })
}
