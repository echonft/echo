import { type ApiRequest } from '@echo/api/types/api-request'
import { type CollectionsResponse } from '@echo/api/types/responses/collections-response'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { getAllCollectionsWithSwapsCount } from '@echo/frontend/lib/helpers/collection/get-all-collections-with-swaps-count'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import { parseCollectionFiltersQuery } from '@echo/frontend/lib/helpers/request/parse-collection-filters-query'
import { parseConstraintsQuery } from '@echo/frontend/lib/helpers/request/parse-constraints-query'
import { type Collection } from '@echo/model/types/collection'
import { NextResponse } from 'next/server'
import { isNil } from 'ramda'

export async function getCollectionsRequestHandler(req: ApiRequest<never>) {
  const constraints = guardFn(parseConstraintsQuery<Collection>, ErrorStatus.BAD_REQUEST)(req)
  const filters = guardFn(parseCollectionFiltersQuery, ErrorStatus.BAD_REQUEST)(req)
  const includeSwapsCount = isNil(filters) ? false : filters.includeSwapsCount
  // we need to remove limit and offset constraints if swaps counts are included - it will be done after manually on the list
  // we do not need to remove any orderBy or select constraints - they will just be ignored
  const collections = await guardAsyncFn(
    includeSwapsCount ? getAllCollectionsWithSwapsCount : getAllCollections,
    ErrorStatus.SERVER_ERROR
  )(constraints)
  return NextResponse.json<CollectionsResponse>({ collections })
}
