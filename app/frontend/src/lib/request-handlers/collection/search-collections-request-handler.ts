import { getCollectionsSearchData } from '@echo/firestore/crud/collection/get-collections-search-data'
import { mapCollectionToSearchResult } from '@echo/firestore/mappers/collection/map-collection-to-search-result'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { getSearchParam } from '@echo/frontend/lib/helpers/get-search-param'
import type { RequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { NextResponse } from 'next/server'
import { andThen, either, filter, map, pipe, propSatisfies, test, toLower } from 'ramda'

export async function searchCollectionsRequestHandler({ req, logger }: RequestHandlerArgs) {
  const query = getSearchParam<string>(req, 'q', true)
  const regex = new RegExp(toLower(query), 'ig')
  const search = pipe(toLower, test(regex))
  const results = await guardAsyncFn({
    fn: pipe(
      getCollectionsSearchData,
      andThen(
        pipe(
          filter(either(propSatisfies(search, 'name'), propSatisfies(search, 'slug'))),
          map(mapCollectionToSearchResult)
        )
      )
    ),
    status: ErrorStatus.SERVER_ERROR,
    logger
  })()
  return NextResponse.json({ results })
}
